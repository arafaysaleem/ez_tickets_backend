const GenreModel = require('../models/genre.model');
const {
    NotFoundException,
    CreateFailedException,
    UpdateFailedException,
    UnexpectedException
} = require('../utils/exceptions/database.exception');
const { structureResponse } = require('../utils/common.utils');

class GenreRepository {
    findAll = async (params = {}) => {
        const hasParams = Object.keys(params).length !== 0;
        let genreList = await GenreModel.findAll(hasParams ? params : {});
        if (!genreList.length) {
            throw new NotFoundException('Genres not found');
        }

        return structureResponse(genreList, 1, "Success");
    };

    findOne = async (params) => {
        const result = await GenreModel.findOne(params);
        if (!result) {
            throw new NotFoundException('Genre not found');
        }

        return structureResponse(result, 1, "Success");
    };

    findAllMoviesByGenre = async (params) => {
        const genreDuplicates = await GenreModel.findAllMoviesByGenre(params);
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

        return structureResponse(genreBody, 1, "Success");
    };

    create = async (body) => {
        const result = await GenreModel.create(body);
        if (!result) {
            throw new CreateFailedException('Genre failed to be created');
        }

        return structureResponse(result, 1, 'Genre was created!');
    };

    update = async (body, id) => {
        const result = await GenreModel.update(body, id);

        if (!result) {
            throw new UnexpectedException('Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        if (!affectedRows) throw new NotFoundException('Genre not found');
        else if (affectedRows && !changedRows) throw new UpdateFailedException('Genre update failed');
        
        const message = 'Genre updated successfully';

        return structureResponse(info, 1, message);
    };

    delete = async (id) => {
        const result = await GenreModel.delete(id);
        if (!result) {
            throw new NotFoundException('Genre not found');
        }

        return structureResponse({}, 1, 'Genre has been deleted');
    };
}

module.exports = new GenreRepository;