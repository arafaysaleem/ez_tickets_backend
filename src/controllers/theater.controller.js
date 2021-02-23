const { checkValidation } = require('../middleware/validation.middleware');
const { structureResponse } = require('../utils/common.utils');

const TheaterModel = require('../models/theater.model');
const {
    NotFoundException,
    CreateFailedException,
    UpdateFailedException,
    UnexpectedException
} = require('../utils/exceptions/database.exception');

class TheaterController {
    getAllTheaters = async (req, res, next) => {
        let theaterList = await TheaterModel.findAll();
        if (!theaterList.length) {
            throw new NotFoundException('Theaters not found');
        }

        const response = structureResponse(theaterList, 1, "Success");
        res.send(response);
    };

    getTheaterById = async (req, res, next) => {
        const theater = await TheaterModel.findOne({ theater_id: req.params.id });
        if (!theater) {
            throw new NotFoundException('Theater not found');
        }

        const response = structureResponse(theater, 1, "Success");
        res.send(response);
    };

    getTheaterSeatsMap = async (req, res, next) => {
        const theater = await TheaterModel.findOne({ theater_id: req.params.id });
        if (!theater) {
            throw new NotFoundException('Theater not found');
        }

        const response = structureResponse(theater, 1, "Success");
        res.send(response);
    };

    createTheater = async (req, res, next) => {
        checkValidation(req);

        const result = await TheaterModel.create(req.body);

        if (!result) {
            throw new CreateFailedException('Theater failed to be created');
        }

        const response = structureResponse(result, 1, 'Theater was created!');
        res.status(201).send(response);
    };

    updateTheater = async (req, res, next) => {
        checkValidation(req);

        const result = await TheaterModel.update(req.body, req.params.id);

        if (!result) {
            throw new UnexpectedException('Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        if (!affectedRows) throw new NotFoundException('Theater not found');
        else if (affectedRows && !changedRows) throw new UpdateFailedException('Theater update failed');
        
        const response = structureResponse(info, 1, 'Theater updated successfully');
        res.send(response);
    };

    deleteTheater = async (req, res, next) => {
        const result = await TheaterModel.delete(req.params.id);
        if (!result) {
            throw new NotFoundException('Theater not found');
        }

        const response = structureResponse({}, 1, 'Theater has been deleted');
        res.send(response);
    };
}

module.exports = new TheaterController;