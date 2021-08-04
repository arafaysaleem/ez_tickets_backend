const { structureResponse } = require('../utils/common.utils');
const { DBService } = require('../db/db-service');

const TheaterModel = require('../models/theater.model');
const TheaterSeatModel = require('../models/theaterSeat.model');
const SeatType = require('../utils/enums/seatTypes.utils');
const {
    NotFoundException,
    CreateFailedException,
    UpdateFailedException,
    UnexpectedException
} = require('../utils/exceptions/database.exception');

class TheaterRepository {
    findAll = async (params = {}) => {
        const hasParams = Object.keys(params).length !== 0;
        let theaterDuplicates = await TheaterModel.findAll(hasParams ? params : {});
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

        return structureResponse(theaterList, 1, "Success");
    };

    findOne = async (params) => {
        const theaterDuplicates = await TheaterModel.findOne(params);
        if (!theaterDuplicates.length) {
            throw new NotFoundException('Theater not found');
        }

        let theaterBody = {};

        for (const theater of theaterDuplicates) {
            const {seat_row, seat_number, seat_type, ...theaterDetails} = theater;
            if (Object.keys(theaterBody).length === 0) {
                theaterBody = theaterDetails;
                theaterBody.missing = [];
                theaterBody.blocked = [];
            }
            if (seat_type === SeatType.Missing){
                theaterBody.missing.push({ seat_row, seat_number });
            } else {
                theaterBody.blocked.push({ seat_row, seat_number });
            }
        };

        return structureResponse(theaterBody, 1, "Success");
    };

    create = async (body) => {
        const {missing, blocked, ...theaterBody} = body;

        await DBService.beginTransaction();

        const result = await TheaterModel.create(theaterBody);

        if (!result) {
            await DBService.rollback();
            throw new CreateFailedException('Theater failed to be created');
        }

        if (missing) {
            for (let seat of missing) {
                seat = seat.split("-"); // "A-11" -> ["A",11];
                const theaterSeat = {
                    theater_id: result.theater_id,
                    seat_type: SeatType.Missing,
                    seat_row: seat[0],
                    seat_number: seat[1]
                };
                const success = await TheaterSeatModel.create(theaterSeat);
                if (!success) {
                    await DBService.rollback();
                    throw new CreateFailedException('Theater missing seat failed to be created');
                }
            }
        }
        if (blocked){
            for (let seat of blocked) {
                seat = seat.split("-"); // "A-11" -> ["A",11];
                const theaterSeat = {
                    theater_id: result.theater_id,
                    seat_type: SeatType.Blocked,
                    seat_row: seat[0],
                    seat_number: seat[1]
                };
                const success = await TheaterSeatModel.create(theaterSeat);
                if (!success) {
                    await DBService.rollback();
                    throw new CreateFailedException('Theater blocked seat failed to be created');
                }
            }
        }

        await DBService.commit();

        return structureResponse(result, 1, 'Theater was created!');
    };

    update = async (body, id) => {
        const result = await TheaterModel.update(body, id);

        if (!result) {
            throw new UnexpectedException('Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        if (!affectedRows) throw new NotFoundException('Theater not found');
        else if (affectedRows && !changedRows) throw new UpdateFailedException('Theater update failed');
        
        return structureResponse(info, 1, 'Theater updated successfully');
    };

    delete = async (id) => {
        const result = await TheaterModel.delete(id);
        if (!result) {
            throw new NotFoundException('Theater not found');
        }

        return structureResponse({}, 1, 'Theater has been deleted');
    };
}

module.exports = new TheaterRepository;