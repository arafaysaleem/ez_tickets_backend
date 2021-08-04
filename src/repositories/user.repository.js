const { structureResponse, hashPassword } = require('../utils/common.utils');

const UserModel = require('../models/user.model');
const {
    NotFoundException,
    CreateFailedException,
    UpdateFailedException,
    UnexpectedException
} = require('../utils/exceptions/database.exception');

class UserRepository {
    findAll = async (params = {}) => {
        const hasParams = Object.keys(params).length !== 0;
        let userList = await UserModel.findAll(hasParams ? params : {});
        if (!userList.length) {
            throw new NotFoundException('Users not found');
        }

        userList = userList.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });

        return structureResponse(userList, 1, "Success");
    };

    findOne = async (params) => {
        const user = await UserModel.findOne(params);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const { password, ...userWithoutPassword } = user;

        return structureResponse(userWithoutPassword, 1, "Success");
    };

    create = async (body) => {
        await hashPassword(body);

        const result = await UserModel.create(body);

        if (!result) {
            throw new CreateFailedException('User failed to be created');
        }

        return structureResponse(result, 1, 'User was created!');
    };

    update = async (body, filters) => {
        const result = await UserModel.update(body, filters);

        if (!result) {
            throw new UnexpectedException('Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        if (!affectedRows) throw new NotFoundException('User not found');
        else if (affectedRows && !changedRows) throw new UpdateFailedException('User update failed');
        
        return structureResponse(info, 1, 'User updated successfully');
    };

    delete = async (id) => {
        const result = await UserModel.delete(id);
        if (!result) {
            throw new NotFoundException('User not found');
        }

        return structureResponse({}, 1, 'User has been deleted');
    };
}

module.exports = new UserRepository;