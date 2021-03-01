const { checkValidation } = require('../middleware/validation.middleware');
const { structureResponse } = require('../utils/common.utils');

const BookingModel = require('../models/booking.model');
const {
    NotFoundException,
    CreateFailedException,
    UpdateFailedException,
    UnexpectedException
} = require('../utils/exceptions/database.exception');

class BookingController {
    getAllBookings = async (req, res, next) => {
        let bookings = await BookingModel.findAll();
        if (!bookings.length) {
            throw new NotFoundException('Bookings not found');
        }

        const response = structureResponse(bookings, 1, "Success");
        res.send(response);
    };

    getFilteredBookings = async (req, res, next) => {
        checkValidation(req);

        let showList = await BookingModel.findAll(req.body);
        if (!showList.length) {
            throw new NotFoundException('Shows for this movie not found');
        }
        
        const response = structureResponse(showList, 1, "Success");
        res.send(response);
    };

    createBooking = async (req, res, next) => {
        checkValidation(req);

        let {seat, ...bookingBody} = req.body;
        seat = seat.split("-"); // "A-11" -> ["A",11];
        bookingBody.seat_row = seat[0];
        bookingBody.seat_number = seat[1];

        const result = await BookingModel.create(bookingBody);

        if (!result) {
            throw new CreateFailedException('Booking failed to be created');
        }

        const response = structureResponse(result, 1, 'Booking was created!');
        res.status(201).send(response);
    };

    updateBooking = async (req, res, next) => {
        checkValidation(req);

        const result = await BookingModel.update(req.body, req.body.filters);

        if (!result) {
            throw new UnexpectedException('Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        if (!affectedRows) throw new NotFoundException('Booking not found');
        else if (affectedRows && !changedRows) throw new UpdateFailedException('Booking update failed');
        
        const response = structureResponse(info, 1, 'Booking updated successfully');
        res.send(response);
    };

    deleteBooking = async (req, res, next) => {
        const result = await BookingModel.delete(req.body.filters);
        
        if (!result) {
            throw new NotFoundException('Booking not found');
        }

        const response = structureResponse({}, 1, 'Booking has been deleted');
        res.send(response);
    };
}

module.exports = new BookingController;