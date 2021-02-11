const MovieModel = require('../models/movie.model');
const MovieType = require('../utils/movieTypes.utils');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const { structureResponse } = require('../utils/common.utils');

class MovieController {
    getAllMovies = async (req, res, next) => {
        let movieList = await MovieModel.findAll();
        if (!movieList.length) {
            throw new HttpException(404, 'Movies not found');
        }

        const response = structureResponse(movieList, 0,"Success");
        res.send(response);
    };

    getMovieById = async (req, res, next) => {
        const movie = await MovieModel.findOne({ movie_id: req.params.id });
        if (!movie) {
            throw new HttpException(404, 'Movie not found');
        }

        const response = structureResponse(movie, 0,"Success");
        res.send(response);
    };

    getComingSoonMovies = async (req, res, net) => {
        let comingSoonList = await MovieModel.findAll({movie_type: MovieType.ComingSoon});
        if (!comingSoonList.length) {
            throw new HttpException(404, 'Movies not found');
        }

        const response = structureResponse(comingSoonList, 0,"Success");
        res.send(response);
    }

    getNowShowingMovies = async (req, res, net) => {
        let nowShowingList = await MovieModel.findAll({movie_type: MovieType.NowShowing});
        if (!nowShowingList.length) {
            throw new HttpException(404, 'Movies not found');
        }

        const response = structureResponse(nowShowingList, 0,"Success");
        res.send(response);
    }

    createMovie = async (req, res, next) => {
        this.checkValidation(req);

        const result = await MovieModel.create(req.body);

        if (!result) {
            throw new HttpException(500, 'Movie failed to be created');
        }

        const response = structureResponse(result, 0,'Movie was created!');
        res.status(201).send(response);
    };

    updateMovie = async (req, res, next) => {
        this.checkValidation(req);

        const result = await MovieModel.update(req.body, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'Movie not found' :
            affectedRows && changedRows ? 'Movie updated successfully' : 'Movie update failed';
            
        const response = structureResponse(info, 0,message);

        res.send(response);
    };

    deleteMovie = async (req, res, next) => {
        const result = await MovieModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'Movie not found');
        }

        const response = structureResponse({}, 0,'Movie has been deleted');
        res.send(response);
    };

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation failed', errors);
        }
    }
}

module.exports = new MovieController;