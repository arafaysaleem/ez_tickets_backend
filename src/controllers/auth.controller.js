const UserModel = require('../models/user.model');
const HttpException = require('../utils/HttpException.utils');
const { structureResponse } = require('../utils/common.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

class AuthController {

    registerUser = async (req, res, next) => {
        this.checkValidation(req);
        
        const pass = req.body.password;

        await this.hashPassword(req);

        const result = await UserModel.create(req.body);

        if (!result) {
            throw new HttpException(500, 'User failed to be registered');
        }
        
        req.body.password = pass;
        req.body.message = true;

        this.userLogin(req,res,next);
    };

    userLogin = async (req, res, next) => {
        this.checkValidation(req);
        const { email, password: pass } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new HttpException(401, 'Email address not found');
        }

        const isMatch = await bcrypt.compare(pass, user.password);

        if (!isMatch) {
            throw new HttpException(401, 'Incorrect password');
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
        const response = structureResponse(body,0, message);
        res.send(response);
    };

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation failed', errors);
        }
    }

    // hash password if it exists
    hashPassword = async (req) => {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 8);
        }
    }
}

module.exports = new AuthController;