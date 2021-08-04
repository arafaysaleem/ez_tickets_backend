const { structureResponse } = require('../utils/common.utils');
const { DBService } = require('../db/db-service');

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

    findAll = async (params = {}) => {
        const hasParams = Object.keys(params).length !== 0;
        let movieDuplicates = await MovieModel.findAll(hasParams ? params : {});
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

        return structureResponse(moviesList, 1, "Success");
    };

    findOne = async (params) => {
        const movieDuplicates = await MovieModel.findOne(params);
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

        return structureResponse(movieBody, 1, "Success");
    };

    findAllRolesByMovie = async (params) => {
        let roles = await MovieModel.findAllRolesByMovie(params);
        if (!roles.length) {
            throw new NotFoundException('Movie not found');
        }

        roles = roles.map((movie) => {
            const {role_type, movie_id, ...role} = movie;
            return { movie_id, role, role_type};
        });

        return structureResponse(roles, 1, "Success");
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
    create = async (body) => {
        const {roles, genres, ...movieBody} = body;

        await DBService.beginTransaction();

        const result = await MovieModel.create(movieBody);

        if (!result) {
            await DBService.rollback();
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
                    await DBService.rollback();
                    throw new CreateFailedException(`Movie role(id: ${role.role_id}, role_type: ${role.role_type}) failed to be created`);
                }
            } catch (ex) {
                await DBService.rollback();
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
                    await DBService.rollback();
                    throw new CreateFailedException(`Movie genre(id: ${genre_id}) failed to be created`);
                }
            } catch (ex) {
                await DBService.rollback();
                if (ex instanceof ForeignKeyViolationException){
                    throw new CreateFailedException(`Movie genre(id: ${genre_id}) failed to be created`);
                }
            }
        }

        await DBService.commit();

        return structureResponse(result, 1, 'Movie was created!');
    };

    update = async (body, id) => {
        const result = await MovieModel.update(body, id);

        if (!result) {
            throw new UnexpectedException();
        }

        const { affectedRows, changedRows, info } = result;

        if (!affectedRows) throw new NotFoundException('Movie not found');
        else if (affectedRows && !changedRows) throw new UpdateFailedException('Movie update failed');
            
        return structureResponse(info, 1, 'Movie updated successfully');
    };

    delete = async (id) => {
        const result = await MovieModel.delete(id);
        if (!result) {
            throw new NotFoundException('Movie not found');
        }

        return structureResponse({}, 1, 'Movie has been deleted');
    };
}

module.exports = new MovieController;