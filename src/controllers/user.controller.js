const { checkValidation }= require('../middleware/validation.middleware');
const { structureResponse } = require('../utils/common.utils');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const UserModel = require('../models/user.model');
const { 
    NotFoundException,
    CreateFailedException,
    UpdateFailedException,
    UnexpectedException
} = require('../utils/exceptions/database.exception');

class UserController {
    getAllUsers = async (req, res, next) => {
        let userList = await UserModel.findAll();
        if (!userList.length) {
            throw new NotFoundException('Users not found');
        }

        userList = userList.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });

        const response = structureResponse(userList, 1, "Success");
        res.send(response);
    };

    getUserById = async (req, res, next) => {
        const user = await UserModel.findOne({ user_id: req.params.id });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const { password, ...userWithoutPassword } = user;

        const response = structureResponse(userWithoutPassword, 1, "Success");
        res.send(response);
    };

    createUser = async (req, res, next) => {
        checkValidation(req);

        await this.hashPassword(req);

        const result = await UserModel.create(req.body);

        if (!result) {
            throw new CreateFailedException('User failed to be created');
        }

        const response = structureResponse(result, 1,'User was created!');
        res.status(201).send(response);
    };

    updateUser = async (req, res, next) => {
        checkValidation(req);

        const result = await UserModel.update(req.body, {user_id: req.params.id});

        if (!result) {
            throw new UnexpectedException('Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        if(!affectedRows) throw new NotFoundException('User not found');
        else if(affectedRows && !changedRows) throw new UpdateFailedException('User update failed');
        
        const response = structureResponse(info, 1,'User updated successfully');
        res.send(response);
    };

    deleteUser = async (req, res, next) => {
        const result = await UserModel.delete(req.params.id);
        if (!result) {
            throw new NotFoundException('User not found');
        }

        const response = structureResponse({}, 1,'User has been deleted');
        res.send(response);
    };

    // hash password if it exists
    hashPassword = async (req) => {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 8);
        }
    }
}

module.exports = new UserController;