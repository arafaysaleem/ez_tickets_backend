const express = require('express');
const router = express.Router();
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const healthCheckController = require('../controllers/healthCheck.controller');

router.get('/', awaitHandlerFactory(healthCheckController.getHealthStatus)); // localhost:3000/api/v1/health

module.exports = router;