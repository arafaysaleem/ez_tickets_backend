const { checkValidation }= require('../middleware/validation.middleware');
const { structureResponse } = require('../utils/common.utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const { sendOTPEmail } = require('../utils/sendgrid.utils');
const otpGenerator = require('otp-generator')

const UserModel = require('../models/user.model');
const OTPModel = require('../models/otp.model');
const { 
    RegistrationFailedException,
    InvalidCredentialsException,
    OTPExpiredException,
    OTPGenerationException,
    OTPVerificationException
} = require('../utils/exceptions/auth.exception');

const { 
    NotFoundException,
    UpdateFailedException,
    UnexpectedException
} = require('../utils/exceptions/database.exception');



class AuthController {

    registerUser = async (req, res, next) => {
        checkValidation(req);
        
        const pass = req.body.password;

        await this.hashPassword(req);

        const result = await UserModel.create(req.body);

        if (!result) {
            throw new RegistrationFailedException();
        }
        
        req.body.password = pass;
        req.body.message = true;

        this.userLogin(req,res,next);
    };

    userLogin = async (req, res, next) => {
        checkValidation(req);
        const { email, password: pass } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new InvalidCredentialsException('Email not registered');
        }

        const isMatch = await bcrypt.compare(pass, user.password);

        if (!isMatch) {
            throw new InvalidCredentialsException('Incorrect password');
        }

        // user matched!
        const secretKey = process.env.SECRET_JWT || "";
        const token = jwt.sign({ user_id: user.user_id.toString() }, secretKey, {
            expiresIn: '24h'
        });

        let message="";
        let body="";
        if(!!req.body.message){ //if registered first 
            const { user_id, ...userWithoutId } = user;
            message = "Registered"; //set msg to registered
            body = { user_id, token};
        }
        else{
            const { password, ...userWithoutPassword } = user;
            message = "Authenticated";
            body = { ...userWithoutPassword, token};
        }
        const response = structureResponse(body, 1, message);
        res.send(response);
    };

    forgotPassword = async (req, res, next) => {
        checkValidation(req);

        let user = await UserModel.findOne(req.body); //body contains "email" : ...
        
        if (!user) {
            throw new InvalidCredentialsException('Email not registered');
        }
        
        this.#removeExpiredOTP(user.user_id);

        const OTP = this.#generateOTP(user.user_id);

        sendOTPEmail(user,OTP);

        const response = structureResponse({}, 1, 'OTP generated and sent via email');
        res.send(response);
    }

    #generateOTP = (user_id,email) => {
        const OTP = otpGenerator.generate(4, { alphabets: false, upperCase: false, specialChars: false });

        OTPHash = await bcrypt.hash(OTP, 8);

        let expiration_datetime = new Date();
        expiration_datetime.setHours(expiration_datetime.getHours() + 1);

        const result = await UserModel.createOTP({user_id,email,OTP: OTPHash, expiration_datetime});

        if (!result) throw new OTPGenerationException();

        return OTP;
    }

    #removeExpiredOTP = (user_id) => {
        const result = await OTPModel.findOne({user_id});

        if (!!result) { //if found, delete
            affectedRows = await OTPModel.delete({user_id});

            if (!affectedRows) {
                throw new OTPGenerationException('Expired OTP could not be deleted');
            }
        }
    }

    verifyOTP = async (req, res, next) => {
        checkValidation(req);

        const {OTP, email} = req.body;
        let result = await OTPModel.findOne({email});

        if(!result) {
            throw new OTPVerificationException();
        }

        const {expiration_datetime,OTPHash} = result;

        if(expiration_datetime > new Date()) {
            throw new OTPExpiredException();
        }

        const isMatch = await bcrypt.compare(OTP, OTPHash);

        if(!isMatch) {
            throw new OTPVerificationException();
        }

        result = await OTPModel.delete({email});

        if(!result) {
            throw new OTPVerificationException('Old OTP failed to be deleted');
        }

        const response = structureResponse({}, 1, 'OTP verified succesfully');
        res.send(response);
    }

    changePassword = async (req, res, next) => {
        checkValidation(req);

        const oldPassword = req.body.password;

        const user = await UserModel.findOne({ user_id: req.params.id });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            throw new InvalidCredentialsException('Incorrect old password');
        }

        req.body.password = req.body.new_password;
        req.body.new_password = undefined;

        this.resetPassword(req,res,next);
    };

    resetPassword = async (req, res, next) => {
        checkValidation(req);

        await this.hashPassword(req);

        const { password, email } = req.body;

        const result = await UserModel.update(password, {email});

        if (!result) {
            throw new UnexpectedException('Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        if(!affectedRows) throw new NotFoundException('User not found');
        else if(affectedRows && !changedRows) throw new UpdateFailedException('Password change failed');
        
        const response = structureResponse(info, 1,'Password changed successfully');
        res.send(response);
    }

    // hash password if it exists
    hashPassword = async (req) => {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 8);
        }
    }
}

module.exports = new AuthController;