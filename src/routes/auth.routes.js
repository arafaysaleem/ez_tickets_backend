const express = require('express');
const router = express.Router();
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const authController = require('../controllers/auth.controller');
const { createUserSchema, validateLogin } = require('../middleware/validators/userValidator.middleware');

router.post('/register', createUserSchema, awaitHandlerFactory(authController.registerUser)); // localhost:3000/api/v1/auth/register
router.post('/login', validateLogin, awaitHandlerFactory(authController.userLogin)); // localhost:3000/api/v1/auth/login

module.exports = router;