const MovieModel = require('../models/movie.model');
const MovieRoleModel = require('../models/movieRole.model');
const MovieType = require('../utils/enums/movieTypes.utils');
const {checkValidation} = require('../middleware/validation.middleware');
const {
    NotFoundException,
    CreateFailedException,
    UpdateFailedException,
    UnexpectedException
} = require('../utils/exceptions/database.exception');
const { structureResponse } = require('../utils/common.utils');

class MovieController {
    getAllMovies = async (req, res, next) => {
        let movieDuplicates = await MovieModel.findAll();
        if (!movieDuplicates.length) {
            throw new NotFoundException('Movies not found');
        }

        let movieList = {};

        for (const movie of movieDuplicates) {
            const {role_id, full_name, age, picture_url, role_type, ...movieDetails} = movie;
            const movie_id = movie.movie_id;
            if (!movieList[movie_id]) {
                movieList[movie_id] = movieDetails;
                movieList[movie_id].roles = [];
            }
            movieList[movie_id].roles.push({ role_id, full_name, age, picture_url, role_type });
        }

        movieList = Object.values(movieList);

        const response = structureResponse(movieList, 1, "Success");
        res.send(response);
    };

    getMovieById = async (req, res, next) => {
        const movieDuplicates = await MovieModel.findOne({ movie_id: req.params.id });
        if (!movieDuplicates.length) {
            throw new NotFoundException('Movie not found');
        }

        let movieBody = {};

        const roles = movieDuplicates.map((movie) => {
            const {role_id, full_name, age, picture_url, role_type, ...movieDetails} = movie;
            if (Object.keys(movieBody).length === 0) movieBody = movieDetails;
            return { role_id, full_name, age, picture_url, role_type };
        });

        movieBody.roles = roles;

        const response = structureResponse(movieBody, 1, "Success");
        res.send(response);
    };

    getMovieRoles = async (req, res, next) => {
        const movieDuplicates = await MovieModel.findOne({ movie_id: req.params.id, ...req.body });
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

    // map these too
    getComingSoonMovies = async (req, res, net) => {
        let comingSoonList = await MovieModel.findAll({movie_type: MovieType.ComingSoon});
        if (!comingSoonList.length) {
            throw new NotFoundException('Movies not found');
        }

        const response = structureResponse(comingSoonList, 1, "Success");
        res.send(response);
    }

    getNowShowingMovies = async (req, res, net) => {
        let nowShowingList = await MovieModel.findAll({movie_type: MovieType.NowShowing});
        if (!nowShowingList.length) {
            throw new NotFoundException('Movies not found');
        }

        const response = structureResponse(nowShowingList, 1, "Success");
        res.send(response);
    }

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
        // todo: Run queries in transactions
        const {roles, ...movieBody} = req.body;
        const result = await MovieModel.create(movieBody);

        if (!result) {
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
                throw new CreateFailedException('Movie role failed to be created');
            }
        }

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