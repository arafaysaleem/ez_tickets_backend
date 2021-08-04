const RoleModel = require('../models/role.model');
const {
    NotFoundException,
    CreateFailedException,
    UpdateFailedException,
    UnexpectedException
} = require('../utils/exceptions/database.exception');
const { structureResponse } = require('../utils/common.utils');

class RoleRepository {

    findAll = async (params = {}) => {
        const hasParams = Object.keys(params).length !== 0;
        let roleList = await RoleModel.findAll(hasParams ? params : {});
        if (!roleList.length) {
            throw new NotFoundException('Roles not found');
        }

        return structureResponse(roleList, 1, "Success");
    };

    findOne = async (params) => {
        const result = await RoleModel.findOne(params);
        if (!result) {
            throw new NotFoundException('Role not found');
        }

        return structureResponse(result, 1, "Success");
    };

    findAllMoviesByRole = async (params) => {
        const roleDuplicates = await RoleModel.findAllMoviesByRole(params);
        if (!roleDuplicates.length) {
            throw new NotFoundException('Role not found');
        }

        let roleBody = {};

        const movies = roleDuplicates.map((role) => {
            const {role_id, full_name, age, picture_url, ...movieDetails} = role;
            if (Object.keys(roleBody).length === 0) roleBody = {role_id, full_name, age, picture_url};
            return movieDetails;
        });

        roleBody.movies = movies;

        return structureResponse(roleBody, 1, "Success");
    };

    create = async (body) => {
        const result = await RoleModel.create(body);

        if (!result) {
            throw new CreateFailedException('Role failed to be created');
        }

        return structureResponse(result, 1, 'Role was created!');
    };

    update = async (body, id) => {
        const result = await RoleModel.update(body, id);

        if (!result) {
            throw new UnexpectedException('Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        if (!affectedRows) throw new NotFoundException('Role not found');
        else if (affectedRows && !changedRows) throw new UpdateFailedException('Role update failed');
        
        const message = 'Role updated successfully';

        return structureResponse(info, 1, message);
    };

    delete = async (id) => {
        const result = await RoleModel.delete(id);
        if (!result) {
            throw new NotFoundException('Role not found');
        }

        return structureResponse({}, 1, 'Role has been deleted');
    };
}

module.exports = new RoleRepository;