const RoleModel = require('../models/role.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const { structureResponse } = require('../utils/common.utils');

class RoleController {
    getAllRoles = async (req, res, next) => {
        let roleList = await RoleModel.findAll();
        if (!roleList.length) {
            throw new HttpException(404, 'Roles not found');
        }

        const response = structureResponse(roleList, 0,"Success");
        res.send(response);
    };

    getRoleById = async (req, res, next) => {
        const role = await RoleModel.findOne({ role_id: req.params.id });
        if (!role) {
            throw new HttpException(404, 'Role not found');
        }

        const response = structureResponse(role, 0,"Success");
        res.send(response);
    };

    createRole = async (req, res, next) => {
        this.checkValidation(req);

        const result = await RoleModel.create(req.body);

        if (!result) {
            throw new HttpException(500, 'Role failed to be created');
        }

        const response = structureResponse(result, 0,'Role was created!');
        res.status(201).send(response);
    };

    updateRole = async (req, res, next) => {
        this.checkValidation(req);

        const result = await RoleModel.update(req.body, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'Role not found' :
            affectedRows && changedRows ? 'Role updated successfully' : 'Role update failed';

        const response = structureResponse(info, 0,message);
        res.send(response);
    };

    deleteRole = async (req, res, next) => {
        const result = await RoleModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'Role not found');
        }

        const response = structureResponse({}, 0,'Role has been deleted');
        res.send(response);
    };

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation failed', errors);
        }
    }
}

module.exports = new RoleController;