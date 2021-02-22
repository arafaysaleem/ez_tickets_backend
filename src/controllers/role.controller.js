const RoleModel = require('../models/role.model');
const {checkValidation} = require('../middleware/validation.middleware');
const {
    NotFoundException,
    CreateFailedException,
    UpdateFailedException,
    UnexpectedException
} = require('../utils/exceptions/database.exception');
const { structureResponse } = require('../utils/common.utils');

class RoleController {
    getAllRoles = async (req, res, next) => {
        let roleDuplicates = await RoleModel.findAll();
        if (!roleDuplicates.length) {
            throw new NotFoundException('Roles not found');
        }

        let roleList = {};

        for (const role of roleDuplicates) {
            const {role_id, full_name, age, picture_url, ...movieDetails} = role;
            if (!roleList[role_id]) {
                roleList[role_id] = {role_id, full_name, age, picture_url};
                roleList[role_id].movies = [];
            }
            roleList[role_id].movies.push(movieDetails);
        }

        roleList = Object.values(roleList);

        const response = structureResponse(roleList, 1, "Success");
        res.send(response);
    };

    getRoleById = async (req, res, next) => {
        const roleDuplicates = await RoleModel.findOne({ role_id: req.params.id });
        if (!roleDuplicates.length) {
            throw new NotFoundException('Role not found');
        }

        let roleBody = {};

        const movies = roleDuplicates.map((role) => {
            const {role_id, full_name, age, picture_url, ...movieDetails} = role;
            if (!roleBody.length) roleBody = {role_id, full_name, age, picture_url};
            return movieDetails;
        });

        roleBody.movies = movies;

        const response = structureResponse(roleBody, 1, "Success");
        res.send(response);
    };

    getRoleMovies = async (req, res, next) => {
        const roleDuplicates = await RoleModel.findOne({ role_id: req.params.id, ...req.body });
        if (!roleDuplicates.length) {
            throw new NotFoundException('Role not found');
        }

        const movies = roleDuplicates.map((role) => {
            const {role_id, full_name, age, picture_url, ...movieDetails} = role;
            return movieDetails;
        });

        const response = structureResponse(movies, 1, "Success");
        res.send(response);
    };

    createRole = async (req, res, next) => {
        checkValidation(req);

        const result = await RoleModel.create(req.body);

        if (!result) {
            throw new CreateFailedException('Role failed to be created');
        }

        const response = structureResponse(result, 1, 'Role was created!');
        res.status(201).send(response);
    };

    updateRole = async (req, res, next) => {
        checkValidation(req);

        const result = await RoleModel.update(req.body, req.params.id);

        if (!result) {
            throw new UnexpectedException('Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        if (!affectedRows) throw new NotFoundException('Role not found');
        else if (affectedRows && !changedRows) throw new UpdateFailedException('Role update failed');
        
        const message = 'Role updated successfully';

        const response = structureResponse(info, 1, message);
        res.send(response);
    };

    deleteRole = async (req, res, next) => {
        const result = await RoleModel.delete(req.params.id);
        if (!result) {
            throw new NotFoundException('Role not found');
        }

        const response = structureResponse({}, 1, 'Role has been deleted');
        res.send(response);
    };
}

module.exports = new RoleController;