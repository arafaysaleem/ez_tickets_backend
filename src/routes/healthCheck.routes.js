const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const healthCheckController = require('../controllers/healthCheck.controller');
const UserRole = require('../utils/enums/userRoles.utils');

router.get('/', auth(UserRole.Admin, UserRole.SuperUser), awaitHandlerFactory(healthCheckController.getHealthStatus)); // localhost:3000/api/v1/health

module.exports = router;