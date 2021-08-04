const {checkValidation} = require('../middleware/validation.middleware');

const MovieRepository = require('../repositories/movie.repository');

class MovieController {

    getAllMovies = async (req, res, next) => {
        checkValidation(req);
        const response = await MovieRepository.findAll(req.query);
        res.send(response);
    };

    getMovieById = async (req, res, next) => {
        const response = await MovieRepository.findOne({ movie_id: req.params.id });
        res.send(response);
    };

    getMovieRoles = async (req, res, next) => {
        const response = await MovieRepository.findAllRolesByMovie({ movie_id: req.params.id });
        res.send(response);
    };

    createMovie = async (req, res, next) => {
        checkValidation(req);
        const response = await MovieRepository.create(req.body);
        res.status(201).send(response);
    };

    updateMovie = async (req, res, next) => {
        checkValidation(req);
        const response = await MovieRepository.update(req.body, req.params.id);
        res.send(response);
    };

    deleteMovie = async (req, res, next) => {
        const response = await MovieRepository.delete(req.params.id);
        res.send(response);
    };
}

module.exports = new MovieController;