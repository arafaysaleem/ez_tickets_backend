const {checkValidation} = require('../middleware/validation.middleware');

const GenreRepository = require('../repositories/genre.repository');

class GenreController {
    getAllGenres = async (req, res, next) => {
        const response = await GenreRepository.findAll();
        res.send(response);
    };

    getGenreById = async (req, res, next) => {
        const response = await GenreRepository.findOne({ genre_id: req.params.id });
        res.send(response);
    };

    getGenreMovies = async (req, res, next) => {
        const response = await GenreRepository.findAllMoviesByGenre({ genre_id: req.params.id });
        res.send(response);
    };

    createGenre = async (req, res, next) => {
        checkValidation(req);

        const response = await GenreRepository.create(req.body);
        res.status(201).send(response);
    };

    updateGenre = async (req, res, next) => {
        checkValidation(req);

        const response = await GenreRepository.update(req.body, req.params.id);
        res.send(response);
    };

    deleteGenre = async (req, res, next) => {
        const response = await GenreRepository.delete(req.params.id);
        res.send(response);
    };
}

module.exports = new GenreController;