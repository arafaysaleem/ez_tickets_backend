const GenreModel = require('../models/genre.model');
const {checkValidation} = require('../middleware/validation.middleware');
const {
    NotFoundException,
    CreateFailedException,
    UpdateFailedException,
    UnexpectedException
} = require('../utils/exceptions/database.exception');
const { structureResponse } = require('../utils/common.utils');

class GenreController {
    getAllGenres = async (req, res, next) => {
        let genreList = await GenreModel.findAll();
        if (!genreList.length) {
            throw new NotFoundException('Genres not found');
        }

        const response = structureResponse(genreList, 1, "Success");
        res.send(response);
    };

    getGenreById = async (req, res, next) => {
        const result = await GenreModel.findOne({ genre_id: req.params.id });
        if (!result) {
            throw new NotFoundException('Genre not found');
        }

        const response = structureResponse(result, 1, "Success");
        res.send(response);
    };

    getGenreMovies = async (req, res, next) => {
        const genreDuplicates = await GenreModel.findAllMoviesByGenre({ genre_id: req.params.id });
        if (!genreDuplicates.length) {
            throw new NotFoundException('Genre with movies not found');
        }

        let genreBody = {};

        const movies = genreDuplicates.map((genre_movie) => {
            const {genre_id, genre, ...movieDetails} = genre_movie;
            if (Object.keys(genreBody).length === 0) genreBody = {genre_id, genre};
            return movieDetails;
        });

        genreBody.movies = movies;

        const response = structureResponse(genreBody, 1, "Success");
        res.send(response);
    };

    createGenre = async (req, res, next) => {
        checkValidation(req);

        const result = await GenreModel.create(req.body);

        if (!result) {
            throw new CreateFailedException('Genre failed to be created');
        }

        const response = structureResponse(result, 1, 'Genre was created!');
        res.status(201).send(response);
    };

    updateGenre = async (req, res, next) => {
        checkValidation(req);

        const result = await GenreModel.update(req.body, req.params.id);

        if (!result) {
            throw new UnexpectedException('Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        if (!affectedRows) throw new NotFoundException('Genre not found');
        else if (affectedRows && !changedRows) throw new UpdateFailedException('Genre update failed');
        
        const message = 'Genre updated successfully';

        const response = structureResponse(info, 1, message);
        res.send(response);
    };

    deleteGenre = async (req, res, next) => {
        const result = await GenreModel.delete(req.params.id);
        if (!result) {
            throw new NotFoundException('Genre not found');
        }

        const response = structureResponse({}, 1, 'Genre has been deleted');
        res.send(response);
    };
}

module.exports = new GenreController;