const {checkValidation} = require('../middleware/validation.middleware');

const RoleRepository = require('../repositories/role.repository');

class RoleController {

    getAllRoles = async (req, res, next) => {
        const response = await RoleRepository.findAll();
        res.send(response);
    };

    getRoleById = async (req, res, next) => {
        const response = await RoleRepository.findOne({ role_id: req.params.id });
        res.send(response);
    };

    getRoleMovies = async (req, res, next) => {
        const response = await RoleRepository.findAllMoviesByRole({ role_id: req.params.id });
        res.send(response);
    };

    createRole = async (req, res, next) => {
        checkValidation(req);

        const response = await RoleRepository.create(req.body);
        res.status(201).send(response);
    };

    updateRole = async (req, res, next) => {
        checkValidation(req);

        const response = await RoleRepository.update(req.body, req.params.id);
        res.send(response);
    };

    deleteRole = async (req, res, next) => {
        const response = await RoleRepository.delete(req.params.id);
        res.send(response);
    };
}

module.exports = new RoleController;