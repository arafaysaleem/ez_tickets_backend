const MovieModel = require('../models/movie.model');
const MovieRoleModel = require('../models/movieRole.model');
const MovieType = require('../utils/movieTypes.utils');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const { structureResponse } = require('../utils/common.utils');

class MovieController {
    getAllMovies = async (req, res, next) => {
        let movieDuplicates = await MovieModel.findAll();
        if (!movieDuplicates.length) {
            throw new HttpException(404, 'Movies not found');
        }

        let movieList = {};

        for (const movie of movieDuplicates) {
            const {mr_id, role_id,full_name,age,picture_url,role_type, ...movieDetails} = movie;
            const movie_id = movie.movie_id;
            if(!movieList[movie_id]) {
                movieList[movie_id] = movieDetails;
                movieList[movie_id].roles = []
            }
            movieList[movie_id].roles.push({ mr_id, role_id, full_name, age, picture_url, role_type });
        }    

        movieList = Object.values(movieList);

        const response = structureResponse(movieList, 0,"Success");
        res.send(response);
    };

    getMovieById = async (req, res, next) => {
        const movieDuplicates = await MovieModel.findOne({ movie_id: req.params.id });
        if (!movieDuplicates.length) {
            throw new HttpException(404, 'Movie not found');
        }

        let movieBody = {};

        const roles = movieDuplicates.map((movie)=>{
            const {mr_id, role_id,full_name,age,picture_url,role_type, ...movieDetails} = movie;
            if(!movieBody.length) movieBody = movieDetails;
            return { mr_id, role_id, full_name, age, picture_url, role_type };
        })

        movieBody.roles = roles;

        const response = structureResponse(movieBody, 0,"Success");
        res.send(response);
    };

    //map these too
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

    /*Roles are is form of a map like this
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
        this.checkValidation(req);
        //todo: Run queries in transactions
        const {roles , ...movieBody} = req.body;
        const result = await MovieModel.create(movieBody);

        if (!result) {
            throw new HttpException(500, 'Movie failed to be created');
        }

        for (const role of roles) {
            const movieRole = {
                movie_id: result.movie_id, 
                role_id: role.role_id,
                role_type: role.role_type
            };
            const success = await MovieRoleModel.create(movieRole);
            if (!success) {
                throw new HttpException(500, 'Movie role failed to be created');
            }
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