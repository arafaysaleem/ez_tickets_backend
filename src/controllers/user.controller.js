const UserModel = require('../models/user.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const { structureResponse } = require('../utils/common.utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

class UserController {
    getAllUsers = async (req, res, next) => {
        let userList = await UserModel.findAll();
        if (!userList.length) {
            throw new HttpException(404, 'Users not found');
        }

        userList = userList.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });

        const response = structureResponse(userList, 0,"Success");
        res.send(response);
    };

    getUserById = async (req, res, next) => {
        const user = await UserModel.findOne({ user_id: req.params.id });
        if (!user) {
            throw new HttpException(404, 'User not found');
        }

        const { password, ...userWithoutPassword } = user;

        const response = structureResponse(userWithoutPassword, 0,"Success");
        res.send(response);
    };

    createUser = async (req, res, next) => {
        this.checkValidation(req);

        await this.hashPassword(req);

        const result = await UserModel.create(req.body);

        if (!result) {
            throw new HttpException(500, 'User failed to be created');
        }

        const response = structureResponse(result, 0,'User was created!');
        res.status(201).send(response);
    };

    updateUser = async (req, res, next) => {
        this.checkValidation(req);

        await this.hashPassword(req);

        const result = await UserModel.update(req.body, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'User not found' :
            affectedRows && changedRows ? 'User updated successfully' : 'User update failed';

        const response = structureResponse(info, 0,message);
        res.send(response);
    };

    deleteUser = async (req, res, next) => {
        const result = await UserModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'User not found');
        }

        const response = structureResponse({}, 0,'User has been deleted');
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

module.exports = new UserController;