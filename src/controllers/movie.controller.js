const {checkValidation} = require('../middleware/validation.middleware');
const { structureResponse } = require('../utils/common.utils');
const { dbTransaction } = require('../db/db-connection');

const MovieModel = require('../models/movie.model');
const MovieRoleModel = require('../models/movieRole.model');
const MovieGenreModel = require('../models/movieGenre.model');
const {
    NotFoundException,
    CreateFailedException,
    UpdateFailedException,
    UnexpectedException,
    ForeignKeyViolationException
} = require('../utils/exceptions/database.exception');

class MovieController {

    getAllMovies = async (req, res, next) => {
        checkValidation(req);

        let movieDuplicates = await MovieModel.findAll(req.query);
        if (!movieDuplicates.length) {
            throw new NotFoundException('Movies not found');
        }

        let moviesList = {};

        for (const movie of movieDuplicates) {
            movie.rating = parseFloat(movie.rating);
            const { movie_id } = movie;
            const { genre_id, genre, ...movieDetails } = movie;
            if (!moviesList[movie_id]) {
                moviesList[movie_id] = movieDetails;
                moviesList[movie_id].genres = [];
            }
            moviesList[movie_id].genres.push({ genre_id, genre });
        }

        moviesList = Object.values(moviesList);

        const response = structureResponse(moviesList, 1, "Success");
        res.send(response);
    };

    getMovieById = async (req, res, next) => {
        const movieDuplicates = await MovieModel.findOne({ movie_id: req.params.id });
        if (!movieDuplicates.length) {
            throw new NotFoundException('Movie not found');
        }

        let movieBody = {};

        const genres = movieDuplicates.map((movie) => {
            const { genre_id, genre, ...movieDetails } = movie;
            if (Object.keys(movieBody).length === 0) movieBody = movieDetails;
            return { genre_id, genre };
        });

        movieBody.genres = genres;
        movieBody.rating = parseFloat(movieBody.rating);

        const response = structureResponse(movieBody, 1, "Success");
        res.send(response);
    };

    getMovieRoles = async (req, res, next) => {
        let roles = await MovieModel.findAllRolesByMovie({ movie_id: req.params.id });
        if (!roles.length) {
            throw new NotFoundException('Movie not found');
        }

        roles = roles.map((movie) => {
            const {role_type, movie_id, ...role} = movie;
            return { movie_id, role, role_type};
        });

        const response = structureResponse(roles, 1, "Success");
        res.send(response);
    };

    /* Roles and genres are is form of a map like this
        roles: [
            {
                role_id: 1,
                role_type: 'director'
            },
            {
                role_id: 2,
                role_type: 'cast'
            },
        ],
        genres: [1,2] //genre ids
    */
    createMovie = async (req, res, next) => {
        checkValidation(req);

        const {roles, genres, ...movieBody} = req.body;

        await dbTransaction.beginTransaction();

        const result = await MovieModel.create(movieBody);

        if (!result) {
            await dbTransaction.rollback();
            throw new CreateFailedException('Movie failed to be created');
        }

        const { movie_id } = result;

        
        for (const role of roles) {
            const movieRole = {
                movie_id,
                role_id: role.role_id,
                role_type: role.role_type
            };
            try {
                const success = await MovieRoleModel.create(movieRole);
                if (!success) {
                    await dbTransaction.rollback();
                    throw new CreateFailedException(`Movie role(id: ${role.role_id}, role_type: ${role.role_type}) failed to be created`);
                }
            } catch (ex) {
                await dbTransaction.rollback();
                if (ex instanceof ForeignKeyViolationException){
                    throw new CreateFailedException(`Movie role(id: ${role.role_id}, role_type: ${role.role_type}) failed to be created`);
                }
            }
        }

        for (const genre_id of genres) {
            const movieGenre = { movie_id, genre_id };
            try {
                const success = await MovieGenreModel.create(movieGenre);
                if (!success) {
                    await dbTransaction.rollback();
                    throw new CreateFailedException(`Movie genre(id: ${genre_id}) failed to be created`);
                }
            } catch (ex) {
                await dbTransaction.rollback();
                if (ex instanceof ForeignKeyViolationException){
                    throw new CreateFailedException(`Movie genre(id: ${genre_id}) failed to be created`);
                }
            }
        }

        await dbTransaction.commit();

        const response = structureResponse(result, 1, 'Movie was created!');
        res.status(201).send(response);
    };

    updateMovie = async (req, res, next) => {
        checkValidation(req);

        const result = await MovieModel.update(req.body, req.params.id);

        if (!result) {
            throw new UnexpectedException();
        }

        const { affectedRows, changedRows, info } = result;

        if (!affectedRows) throw new NotFoundException('Movie not found');
        else if (affectedRows && !changedRows) throw new UpdateFailedException('Movie update failed');
            
        const response = structureResponse(info, 1, 'Movie updated successfully');

        res.send(response);
    };

    deleteMovie = async (req, res, next) => {
        const result = await MovieModel.delete(req.params.id);
        if (!result) {
            throw new NotFoundException('Movie not found');
        }

        const response = structureResponse({}, 1, 'Movie has been deleted');
        res.send(response);
    };
}

module.exports = new MovieController;