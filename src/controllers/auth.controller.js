const { checkValidation } = require('../middleware/validation.middleware');

const AuthRepository = require('../repositories/auth.repository');

class AuthController {

    registerUser = async (req, res, next) => {
        checkValidation(req);
        const response = await AuthRepository.registerUser(req.body);
        res.send(response);
    };

    userLogin = async (req, res, next) => {
        checkValidation(req);
        const response = await AuthRepository.userLogin(req.body.email, req.body.password);
        res.send(response);
    };

    refreshToken = async (req, res, next) => {
        checkValidation(req);
        const response = await AuthRepository.refreshToken(req.body);
        res.send(response);
    };

    forgotPassword = async (req, res, next) => {
        checkValidation(req);
        const response = await AuthRepository.forgotPassword(req.body);
        res.send(response);
    }

    verifyOTP = async (req, res, next) => {
        checkValidation(req);
        const response = await AuthRepository.verifyOTP(req.body);
        res.send(response);
    }

    changePassword = async (req, res, next) => {
        checkValidation(req);
        const response = await AuthRepository.changePassword(req.body);
        res.send(response);
    };

    resetPassword = async (req, res, next) => {
        checkValidation(req);
        const response = await AuthRepository.resetPassword(req.body);
        res.send(response);
    }
}

module.exports = new AuthController;