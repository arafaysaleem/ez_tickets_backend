const MovieGenreModel = require('../models/movieGenre.model');
const {checkValidation} = require('../middleware/validation.middleware');
const {
    NotFoundException,
    UpdateFailedException,
    UnexpectedException
} = require('../utils/exceptions/database.exception');
const { structureResponse } = require('../utils/common.utils');

class MovieGenreController {

    // getAllMovieGenres = async (req, res, next) => {
    //     let movieGenreList = await MovieGenreModel.findAll();
    //     if (!movieGenreList.length) {
    //         throw new NotFoundException('Movie Genres not found');
    //     }

    //     const response = structureResponse(movieGenreList, 1, "Success");
    //     res.send(response);
    // };

    updateMovieGenre = async (req, res, next) => {
        checkValidation(req);

        // todo: fix API
        const result = await MovieGenreModel.update(req.body, req.params.id);

        if (!result) {
            throw new UnexpectedException('Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        if (!affectedRows) throw new NotFoundException('Movie Genre not found');
        else if (affectedRows && !changedRows) throw new UpdateFailedException('Movie Genre update failed');
            
        const response = structureResponse(info, 1, 'Movie Genre updated successfully');

        res.send(response);
    };

    deleteMovieGenre = async (req, res, next) => {
        const result = await MovieGenreModel.delete(req.params.id);
        if (!result) {
            throw new NotFoundException('Movie Genre not found');
        }

        const response = structureResponse({}, 1, 'Movie Genre has been deleted');
        res.send(response);
    };
}

module.exports = new MovieGenreController;