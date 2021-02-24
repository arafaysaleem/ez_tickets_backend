const TheaterSeatModel = require('../models/theaterSeat.model');
const {checkValidation} = require('../middleware/validation.middleware');
const { structureResponse } = require('../utils/common.utils');
const {
    NotFoundException,
    UpdateFailedException,
    UnexpectedException
} = require('../utils/exceptions/database.exception');

class TheaterSeatController {

    updateTheaterSeat = async (req, res, next) => {
        checkValidation(req);

        const result = await TheaterSeatModel.update(req.body, req.params.id);

        if (!result) {
            throw new UnexpectedException('Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        if (!affectedRows) throw new NotFoundException('Theater Seat not found');
        else if (affectedRows && !changedRows) throw new UpdateFailedException('Theater Seat update failed');
            
        const response = structureResponse(info, 1, 'Theater Seat updated successfully');

        res.send(response);
    };

    deleteTheaterSeat = async (req, res, next) => {
        const result = await TheaterSeatModel.delete(req.params.id);
        if (!result) {
            throw new NotFoundException('Theater Seat not found');
        }

        const response = structureResponse({}, 1, 'Theater Seat has been deleted');
        res.send(response);
    };
}

module.exports = new TheaterSeatController;