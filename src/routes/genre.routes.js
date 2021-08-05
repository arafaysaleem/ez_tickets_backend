const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const genreController = require('../controllers/genre.controller');
const UserRole = require('../utils/enums/userRoles.utils');
const { createGenreSchema, updateGenreSchema } = require('../middleware/validators/genreValidator.middleware');

router.get('/', auth(), awaitHandlerFactory(genreController.getAllGenres)); // localhost:3000/api/v1/genres
router.get('/id/:id', auth(), awaitHandlerFactory(genreController.getGenreById)); // localhost:3000/api/v1/genres/id/1
router.get('/id/:id/movies', auth(), awaitHandlerFactory(genreController.getGenreMovies)); // Get all movies for this genre_id
router.post('/', auth(UserRole.Admin), createGenreSchema, awaitHandlerFactory(genreController.createGenre)); // localhost:3000/api/v1/genres
router.patch('/id/:id', auth(UserRole.Admin), updateGenreSchema, awaitHandlerFactory(genreController.updateGenre)); // localhost:3000/api/v1/genres/id/1 , using patch for partial update
router.delete('/id/:id', auth(UserRole.Admin), awaitHandlerFactory(genreController.deleteGenre)); // localhost:3000/api/v1/genres/id/1

module.exports = router;