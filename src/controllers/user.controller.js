const { checkValidation } = require('../middleware/validation.middleware');

const UserRepository = require('../repositories/user.repository');

class UserController {
    getAllUsers = async (req, res, next) => {
        const response = await UserRepository.findAll();
        res.send(response);
    };

    getUserById = async (req, res, next) => {
        const response = await UserRepository.findOne({ user_id: req.params.id });
        res.send(response);
    };

    createUser = async (req, res, next) => {
        checkValidation(req);
        const response = await UserRepository.create(req.body);
        res.status(201).send(response);
    };

    updateUser = async (req, res, next) => {
        checkValidation(req);
        const response = await UserRepository.update(req.body, {user_id: req.params.id});
        res.send(response);
    };

    deleteUser = async (req, res, next) => {
        const response = await UserRepository.delete(req.params.id);
        res.send(response);
    };
}

module.exports = new UserController;