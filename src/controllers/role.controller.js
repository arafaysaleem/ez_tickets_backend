const RoleModel = require('../models/role.model');
const {checkValidation}= require('../middleware/validation.middleware');
const { 
    NotFoundException,
    CreateFailedException,
    UpdateFailedException,
    UnexpectedException
} = require('../utils/exceptions/database.exception');
const { structureResponse } = require('../utils/common.utils');

class RoleController {
    getAllRoles = async (req, res, next) => {
        let roleList = await RoleModel.findAll();
        if (!roleList.length) {
            throw new NotFoundException('Roles not found');
        }

        const response = structureResponse(roleList, 1, "Success");
        res.send(response);
    };

    getRoleById = async (req, res, next) => {
        const role = await RoleModel.findOne({ role_id: req.params.id });
        if (!role) {
            throw new NotFoundException('Role not found');
        }

        const response = structureResponse(role, 1, "Success");
        res.send(response);
    };

    createRole = async (req, res, next) => {
        checkValidation(req);

        const result = await RoleModel.create(req.body);

        if (!result) {
            throw new CreateFailedException('Role failed to be created');
        }

        const response = structureResponse(result, 1,'Role was created!');
        res.status(201).send(response);
    };

    updateRole = async (req, res, next) => {
        checkValidation(req);

        const result = await RoleModel.update(req.body, req.params.id);

        if (!result) {
            throw new UnexpectedException('Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        if(!affectedRows) throw new NotFoundException('Role not found');
        else if(affectedRows && !changedRows) throw new UpdateFailedException('Role update failed');
        
        const message = 'Role updated successfully';

        const response = structureResponse(info, 1,message);
        res.send(response);
    };

    deleteRole = async (req, res, next) => {
        const result = await RoleModel.delete(req.params.id);
        if (!result) {
            throw new NotFoundException('Role not found');
        }

        const response = structureResponse({}, 1,'Role has been deleted');
        res.send(response);
    };
}

module.exports = new RoleController;