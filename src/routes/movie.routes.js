const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const movieController = require('../controllers/movie.controller');
const movieRoleController = require('../controllers/movieRoles.controller');
const UserRole = require('../utils/userRoles.utils');
const { createMovieSchema, updateMovieSchema } = require('../middleware/validators/movieValidator.middleware');

router.get('/', auth(), awaitHandlerFactory(movieController.getAllMovies)); // localhost:3000/api/v1/movies
router.get('/id/:id', auth(), awaitHandlerFactory(movieController.getMovieById)); // localhost:3000/api/v1/movies/1
router.get('/now_showing', auth(), awaitHandlerFactory(movieController.getNowShowingMovies)); // localhost:3000/api/v1/movies/now_showing
router.get('/coming_soon', auth(), awaitHandlerFactory(movieController.getComingSoonMovies)); // localhost:3000/api/v1/movies/coming_soon
router.get('/roles/:id', auth(), awaitHandlerFactory(movieRoleController.getRolesByMovieId)); // Get all roles for this movie_id
router.post('/', auth(UserRole.Admin,UserRole.SuperUser), createMovieSchema, awaitHandlerFactory(movieController.createMovie)); // localhost:3000/api/v1/movies
router.patch('/id/:id', auth(UserRole.Admin,UserRole.SuperUser), updateMovieSchema, awaitHandlerFactory(movieController.updateMovie)); // localhost:3000/api/v1/movies/1 , using patch for partial update
router.delete('/id/:id', auth(UserRole.Admin,UserRole.SuperUser), awaitHandlerFactory(movieController.deleteMovie)); // localhost:3000/api/v1/movies/1

module.exports = router;