const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const showController = require('../controllers/show.controller');
const UserRole = require('../utils/enums/userRoles.utils');
const { createShowSchema, updateShowSchema, showFiltersSchema } = require('../middleware/validators/showValidator.middleware');

router.get('/', auth(), awaitHandlerFactory(showController.getAllShows)); // localhost:3000/api/v1/shows
router.get('/id/:id', auth(), awaitHandlerFactory(showController.getShowById)); // localhost:3000/api/v1/shows/id/1
router.get('/filters', auth(), showFiltersSchema, awaitHandlerFactory(showController.getFilteredShows)); // localhost:3000/api/v1/shows
router.post('/', auth(UserRole.Admin), createShowSchema, awaitHandlerFactory(showController.createShow)); // localhost:3000/api/v1/shows
router.patch('/id/:id', auth(UserRole.Admin), updateShowSchema, awaitHandlerFactory(showController.updateShow)); // localhost:3000/api/v1/shows/id/1 , using patch for partial update
router.delete('/id/:id', auth(UserRole.Admin), awaitHandlerFactory(showController.deleteShow)); // localhost:3000/api/v1/shows/id/1

module.exports = router;