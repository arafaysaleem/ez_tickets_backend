const { structureResponse, hashPassword } = require('../utils/common.utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendOTPEmail } = require('../utils/sendgrid.utils');
const otpGenerator = require('otp-generator');
const { Config } = require('../configs/config');

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


class AuthRepository {

    registerUser = async (body) => {
        const pass = body.password;

        await hashPassword(body);

        const result = await UserModel.create(body);

        if (!result) {
            throw new RegistrationFailedException();
        }

        return this.userLogin(body.email, pass, true);
    };

    userLogin = async (email, pass, is_register = false) => {
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new InvalidCredentialsException('Email not registered');
        }

        const isMatch = await bcrypt.compare(pass, user.password);

        if (!isMatch) {
            throw new InvalidCredentialsException('Incorrect password');
        }

        // user matched!
        const secretKey = Config.SECRET_JWT;
        const token = jwt.sign({ user_id: user.user_id.toString() }, secretKey, {
            expiresIn: '24h'
        });

        let message = "";
        let responseBody = "";
        if (is_register){ // if registered first
            const { user_id } = user;
            message = "Registered"; // set msg to registered
            responseBody = { user_id, token };
        } else {
            user.password = undefined;
            message = "Authenticated";
            responseBody = { ...user, token };
        }
        return structureResponse(responseBody, 1, message);
    };

    refreshToken = async (body) => {
        const { email, password: pass, oldToken } = body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new InvalidCredentialsException('Email not registered');
        }

        const isMatch = await bcrypt.compare(pass, user.password);

        if (!isMatch) {
            throw new InvalidCredentialsException('Incorrect password');
        }

        // user matched!
        const secretKey = Config.SECRET_JWT;
        const { user_id } = jwt.decode(oldToken);
        
        if (user.user_id.toString() !== user_id){
            throw new TokenVerificationException();
        }
        
        const token = jwt.sign({ user_id: user.user_id.toString() }, secretKey, {
            expiresIn: '24h'
        });

        return structureResponse({ token }, 1, "Refreshed");
    };

    forgotPassword = async (body) => {
        let user = await UserModel.findOne(body); // body contains "email" : ...
        
        if (!user) {
            throw new InvalidCredentialsException('Email not registered');
        }
        
        await this.#removeExpiredOTP(user.user_id);

        const OTP = await this.#generateOTP(user.user_id, body.email);

        sendOTPEmail(user, OTP);

        return structureResponse({}, 1, 'OTP generated and sent via email');
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

    verifyOTP = async (body) => {
        const {OTP, email} = body;
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

        return structureResponse({}, 1, 'OTP verified succesfully');
    }

    changePassword = async (body) => {
        const { email, password, new_password } = body;
        const user = await UserModel.findOne({ email: email });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new InvalidCredentialsException('Incorrect old password');
        }

        let responseBody = { email: email, password: new_password };

        return this.resetPassword(responseBody);
    };

    resetPassword = async (body) => {
        await hashPassword(body);

        const { password, email } = body;

        const result = await UserModel.update({password}, {email});

        if (!result) {
            throw new UnexpectedException('Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        if (!affectedRows) throw new NotFoundException('User not found');
        else if (affectedRows && !changedRows) throw new UpdateFailedException('Password change failed');
        
        return structureResponse(info, 1, 'Password changed successfully');
    }
}

module.exports = new AuthRepository;