const {checkValidation} = require('../middleware/validation.middleware');
const { structureResponse } = require('../utils/common.utils');
const { dbTransaction } = require('../db/db-connection');

const MovieModel = require('../models/movie.model');
const MovieRoleModel = require('../models/movieRole.model');
const {
    NotFoundException,
    CreateFailedException,
    UpdateFailedException,
    UnexpectedException
} = require('../utils/exceptions/database.exception');

class MovieController {
    
    getAllMovies = async (req, res, next) => {
        checkValidation(req);

        let movies = await MovieModel.findAll(req.query);
        if (!movies.length) {
            throw new NotFoundException('Movies not found');
        }

        movies = movies.map((movie) => {
            movie.rating = parseFloat(movie.rating);
            return movie;
        });

        const response = structureResponse(movies, 1, "Success");
        res.send(response);
    };

    getMovieById = async (req, res, next) => {
        const movie = await MovieModel.findOne({ movie_id: req.params.id });
        if (!movie.length) {
            throw new NotFoundException('Movie not found');
        }

        movie.rating = parseFloat(movie.rating);

        const response = structureResponse(movie, 1, "Success");
        res.send(response);
    };

    getMovieRoles = async (req, res, next) => {
        const movieDuplicates = await MovieModel.findAllRolesByMovie({ movie_id: req.params.id });
        if (!movieDuplicates.length) {
            throw new NotFoundException('Movie not found');
        }

        const roles = movieDuplicates.map((movie) => {
            const {role_id, full_name, age, picture_url, role_type} = movie;
            return { role_id, full_name, age, picture_url, role_type };
        });

        const response = structureResponse(roles, 1, "Success");
        res.send(response);
    };

    /* Roles are is form of a map like this
        [
            {
                role_id: 1,
                role_type: 'director'
            },
            {
                role_id: 2,
                role_type: 'cast'
            },
        ]
    */
    createMovie = async (req, res, next) => {
        checkValidation(req);

        const {roles, ...movieBody} = req.body;

        await dbTransaction.beginTransaction();

        const result = await MovieModel.create(movieBody);

        if (!result) {
            await dbTransaction.rollback();
            throw new CreateFailedException('Movie failed to be created');
        }

        for (const role of roles) {
            const movieRole = {
                movie_id: result.movie_id,
                role_id: role.role_id,
                role_type: role.role_type
            };
            const success = await MovieRoleModel.create(movieRole);
            if (!success) {
                await dbTransaction.rollback();
                throw new CreateFailedException('Movie role failed to be created');
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