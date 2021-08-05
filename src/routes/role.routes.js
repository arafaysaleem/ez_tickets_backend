const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const roleController = require('../controllers/role.controller');
const UserRole = require('../utils/enums/userRoles.utils');
const { createRoleSchema, updateRoleSchema } = require('../middleware/validators/roleValidator.middleware');

router.get('/', auth(), awaitHandlerFactory(roleController.getAllRoles)); // localhost:3000/api/v1/roles
router.get('/id/:id', auth(), awaitHandlerFactory(roleController.getRoleById)); // localhost:3000/api/v1/roles/id/1
router.get('/id/:id/movies', auth(), awaitHandlerFactory(roleController.getRoleMovies)); // Get all movies for this role_id
router.post('/', auth(UserRole.Admin), createRoleSchema, awaitHandlerFactory(roleController.createRole)); // localhost:3000/api/v1/roles
router.patch('/id/:id', auth(UserRole.Admin), updateRoleSchema, awaitHandlerFactory(roleController.updateRole)); // localhost:3000/api/v1/roles/id/1 , using patch for partial update
router.delete('/id/:id', auth(UserRole.Admin), awaitHandlerFactory(roleController.deleteRole)); // localhost:3000/api/v1/roles/id/1

module.exports = router;