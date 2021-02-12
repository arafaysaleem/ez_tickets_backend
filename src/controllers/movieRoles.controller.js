const MovieRoleModel = require('../models/movieRole.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const { structureResponse } = require('../utils/common.utils');

class MovieRoleController {

    getAllMovieRoles = async (req, res, next) => {
        let movieRoleList = await MovieRoleModel.findAll();
        if (!movieRoleList.length) {
            throw new HttpException(404, 'Movie Roles not found');
        }

        const response = structureResponse(movieRoleList, 0,"Success");
        res.send(response);
    };

    getMoviesByRoleId = async (req, res, next) => {
        let moviesList = await MovieRoleModel.findMovieDetails({ role_id: req.params.id });
        if (!moviesList.length) {
            throw new HttpException(404, 'No movies for this role');
        }

        moviesList = moviesList.map((movieBody)=>{
            const {mr_id,role_id, ...movie} = movieBody;
            return movie;
        });

        const response = structureResponse(moviesList, 0,"Success");
        res.send(response);
    };

    getRolesByMovieId = async (req, res, next) => {
        let roleList = await MovieRoleModel.findRoleDetails({ movie_id: req.params.id });
        if (!roleList.length) {
            throw new HttpException(404, 'No roles for this movie');
        }

        // roleList = roleList.map((roleBody)=>{
        //     const {mr_id,movie_id, ...role} = roleBody;
        //     return role;
        // });

        const response = structureResponse(roleList, 0,"Success");
        res.send(response);
    };

    updateMovieRole = async (req, res, next) => {
        this.checkValidation(req);

        const result = await MovieRoleModel.update(req.body, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'Movie Role not found' :
            affectedRows && changedRows ? 'Movie Role updated successfully' : 'Movie Role update failed';
            
        const response = structureResponse(info, 0,message);

        res.send(response);
    };

    deleteMovieRole = async (req, res, next) => {
        const result = await MovieRoleModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'Movie Role not found');
        }

        const response = structureResponse({}, 0,'Movie Role has been deleted');
        res.send(response);
    };

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation failed', errors);
        }
    }
}

module.exports = new MovieRoleController;