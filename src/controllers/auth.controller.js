const UserModel = require('../models/user.model');
const {checkValidation}= require('../middleware/validation.middleware');
const { 
    RegistrationFailedException,
    InvalidCredentialsException
} = require('../utils/exceptions/api.exception');
const { structureResponse } = require('../utils/common.utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

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

    // hash password if it exists
    hashPassword = async (req) => {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 8);
        }
    }
}

module.exports = new AuthController;