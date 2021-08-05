const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const theaterController = require('../controllers/theater.controller');
const UserRole = require('../utils/enums/userRoles.utils');
const { createTheaterSchema, updateTheaterSchema } = require('../middleware/validators/theaterValidator.middleware');

router.get('/', auth(), awaitHandlerFactory(theaterController.getAllTheaters)); // localhost:3000/api/v1/theaters
router.get('/id/:id', auth(), awaitHandlerFactory(theaterController.getTheaterById)); // localhost:3000/api/v1/theaters/id/1
router.post('/', auth(UserRole.Admin), createTheaterSchema, awaitHandlerFactory(theaterController.createTheater)); // localhost:3000/api/v1/theaters
router.patch('/id/:id', auth(UserRole.Admin), updateTheaterSchema, awaitHandlerFactory(theaterController.updateTheater)); // localhost:3000/api/v1/theaters/id/1 , using patch for partial update
router.delete('/id/:id', auth(UserRole.Admin), awaitHandlerFactory(theaterController.deleteTheater)); // localhost:3000/api/v1/theaters/id/1

module.exports = router;