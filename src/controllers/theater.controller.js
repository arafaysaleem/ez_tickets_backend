const { checkValidation } = require('../middleware/validation.middleware');
const { structureResponse } = require('../utils/common.utils');

const TheaterModel = require('../models/theater.model');
const TheaterSeatModel = require('../models/theaterSeat.model');
const SeatType = require('../utils/enums/seatTypes.utils');
const {
    NotFoundException,
    CreateFailedException,
    UpdateFailedException,
    UnexpectedException
} = require('../utils/exceptions/database.exception');

class TheaterController {
    getAlTheaters = async (req, res, next) => {
        let theaterDuplicates = await TheaterModel.findAll();
        if (!theaterDuplicates.length) {
            throw new NotFoundException('Theaters not found');
        }

        let theaterList = {};

        for (const theater of theaterDuplicates) {
            const {seat_row, seat_number, seat_type, ...theaterDetails} = theater;
            const theater_id = theater.theater_id;
            if (!theaterList[theater_id]) {
                theaterList[theater_id] = theaterDetails;
                theaterList[theater_id].missing = [];
                theaterList[theater_id].blocked = [];
            }
            if (seat_type === SeatType.Missing){
                theaterList[theater_id].missing.push({ seat_row, seat_number });
            } else {
                theaterList[theater_id].blocked.push({ seat_row, seat_number });
            }
        }

        theaterList = Object.values(theaterList);

        const response = structureResponse(theaterList, 1, "Success");
        res.send(response);
    };

    getTheaterById = async (req, res, next) => {
        const theaterDuplicates = await TheaterModel.findOne({ theater_id: req.params.id });
        if (!theaterDuplicates.length) {
            throw new NotFoundException('Theater not found');
        }

        let theaterBody = {};

        for (const theater of theaterDuplicates) {
            const {seat_row, seat_number, seat_type, ...theaterDetails} = theater;
            if (!theaterBody.length) {
                theaterBody = theaterDetails;
                theaterBody.missing = theaterBody.blocked = [];
            }
            if (seat_type === SeatType.Missing){
                theaterBody.missing.push({ seat_row, seat_number });
            } else {
                theaterBody.blocked.push({ seat_row, seat_number });
            }
        };

        const response = structureResponse(theaterBody, 1, "Success");
        res.send(response);
    };

    createTheater = async (req, res, next) => {
        checkValidation(req);

        const {missing, blocked, ...theaterBody} = req.body;
        const result = await TheaterModel.create(theaterBody);

        if (!result) {
            throw new CreateFailedException('Theater failed to be created');
        }

        for (let seat of missing) {
            seat = seat.split("-"); // "A-11" -> ["A",11];
            const theaterSeat = {
                theater_id: result.theater_id,
                seat_type: SeatType.Missing,
                seat_row: seat[0],
                seat_num: seat[1]
            };
            const success = await TheaterSeatModel.create(theaterSeat);
            if (!success) {
                throw new CreateFailedException('Theater missing seat failed to be created');
            }
        }

        for (let seat of blocked) {
            seat = seat.split("-"); // "A-11" -> ["A",11];
            const theaterSeat = {
                theater_id: result.theater_id,
                seat_type: SeatType.Blocked,
                seat_row: seat[0],
                seat_num: seat[1]
            };
            const success = await TheaterSeatModel.create(theaterSeat);
            if (!success) {
                throw new CreateFailedException('Theater blocked seat failed to be created');
            }
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