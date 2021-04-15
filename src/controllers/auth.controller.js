const { checkValidation } = require('../middleware/validation.middleware');
const { structureResponse, hashPassword } = require('../utils/common.utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendOTPEmail } = require('../utils/sendgrid.utils');
const otpGenerator = require('otp-generator');

const UserModel = require('../models/user.model');
const OTPModel = require('../models/otp.model');
const {
    RegistrationFailedException,
    InvalidCredentialsException,
    TokenVerificationException,
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

        await hashPassword(req);

        const result = await UserModel.create(req.body);

        if (!result) {
            throw new RegistrationFailedException();
        }
        
        req.body.password = pass;
        req.body.message = true;

        this.userLogin(req, res, next);
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

        let message = "";
        let body = "";
        if (req.body.message){ // if registered first
            const { user_id } = user;
            message = "Registered"; // set msg to registered
            body = { user_id, token};
        } else {
            user.password = undefined;
            message = "Authenticated";
            body = { ...user, token};
        }
        const response = structureResponse(body, 1, message);
        res.send(response);
    };

    refreshToken = async (req, res, next) => {
        checkValidation(req);
        const { email, password: pass, oldToken } = req.body;
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
        const { user_id } = jwt.decode(oldToken);
        
        if (user.user_id.toString() !== user_id){
            throw new TokenVerificationException();
        }
        
        const token = jwt.sign({ user_id: user.user_id.toString() }, secretKey, {
            expiresIn: '24h'
        });

        const response = structureResponse({ token }, 1, "Refreshed");
        res.send(response);
    };

    forgotPassword = async (req, res, next) => {
        checkValidation(req);

        let user = await UserModel.findOne(req.body); // body contains "email" : ...
        
        if (!user) {
            throw new InvalidCredentialsException('Email not registered');
        }
        
        await this.#removeExpiredOTP(user.user_id);

        const OTP = await this.#generateOTP(user.user_id, req.body.email);

        sendOTPEmail(user, OTP);

        const response = structureResponse({}, 1, 'OTP generated and sent via email');
        res.send(response);
    }

    #generateOTP = async (user_id, email) => {
        const OTP = `${otpGenerator.generate(4, { alphabets: false, upperCase: false, specialChars: false })}`;

        const OTPHash = await bcrypt.hash(OTP, 8);

        let expiration_datetime = new Date();
        expiration_datetime.setHours(expiration_datetime.getHours() + 1);

        const body = {user_id, email, OTP: OTPHash, expiration_datetime};
        const result = await OTPModel.create(body);

        if (!result) throw new OTPGenerationException();

        return OTP;
    }

    #removeExpiredOTP = async (user_id) => {
        const result = await OTPModel.findOne({user_id});

        if (result) { // if found, delete
            const affectedRows = await OTPModel.delete({user_id});

            if (!affectedRows) {
                throw new OTPGenerationException('Expired OTP could not be deleted');
            }
        }
    }

    verifyOTP = async (req, res, next) => {
        checkValidation(req);

        const {OTP, email} = req.body;
        let result = await OTPModel.findOne({email});

        if (!result) {
            throw new OTPVerificationException();
        }

        const {expiration_datetime, OTP: OTPHash} = result;

        if (expiration_datetime < new Date()) {
            throw new OTPExpiredException();
        }

        const isMatch = await bcrypt.compare(OTP, OTPHash);

        if (!isMatch) {
            throw new OTPVerificationException();
        }

        result = await OTPModel.delete({email});

        if (!result) {
            throw new OTPVerificationException('Old OTP failed to be deleted');
        }

        const response = structureResponse({}, 1, 'OTP verified succesfully');
        res.send(response);
    }

    changePassword = async (req, res, next) => {
        checkValidation(req);

        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isMatch) {
            throw new InvalidCredentialsException('Incorrect old password');
        }

        req.body.password = req.body.new_password;
        req.body.new_password = undefined;

        this.resetPassword(req, res, next);
    };

    resetPassword = async (req, res, next) => {
        checkValidation(req);

        await hashPassword(req);

        const { password, email } = req.body;

        const result = await UserModel.update({password}, {email});

        if (!result) {
            throw new UnexpectedException('Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        if (!affectedRows) throw new NotFoundException('User not found');
        else if (affectedRows && !changedRows) throw new UpdateFailedException('Password change failed');
        
        const response = structureResponse(info, 1, 'Password changed successfully');
        res.send(response);
    }
}

module.exports = new AuthController;