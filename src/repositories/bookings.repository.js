const { structureResponse, parseTime } = require('../utils/common.utils');

const BookingModel = require('../models/booking.model');
const {
    NotFoundException,
    CreateFailedException,
    UpdateFailedException,
    UnexpectedException
} = require('../utils/exceptions/database.exception');

class BookingsRepository {

    findAll = async (params = {}) => {
        const hasParams = Object.keys(params).length !== 0;
        let bookings = await BookingModel.findAll(hasParams ? params : {});
        if (!bookings.length) {
            throw new NotFoundException('Bookings not found');
        }

        return structureResponse(bookings, 1, "Success");
    }

    findOne = async (params) => {
        let booking = await BookingModel.findOne(params);
        if (!booking) {
            throw new NotFoundException('Booking not found');
        }

        return structureResponse(booking, 1, "Success");
    }

    findAllByUser = async (id, query = {}) => {
        let bookingDuplicates = await BookingModel.findAllByUser(id, query);
        if (!bookingDuplicates.length) {
            throw new NotFoundException('Bookings for this user not found');
        }
        
        let bookingList = {};

        for (let booking of bookingDuplicates) {
            const {title, poster_url, show_id, start_time, date, show_type, ...bookingDetails} = booking;
            if (!bookingList[show_id]) {
                bookingList[show_id] = {title, poster_url};
                const show_datetime = `${date} ${parseTime(start_time)}`;
                bookingList[show_id].show = {show_id, show_type, show_datetime };
                bookingList[show_id].bookings = [];
            }
            bookingList[show_id].bookings.push(bookingDetails);
        }

        bookingList = Object.values(bookingList);

        return structureResponse(bookingList, 1, "Success");
    }

    findAllByShow = async (id) => {
        const bookingDuplicates = await BookingModel.findAllByShow(id, {booking_status: 'confirmed'});

        if (!bookingDuplicates) {
            throw new NotFoundException('No bookings found');
        }

        let seatsList = {};
        seatsList.booked_seats = [];

        if (bookingDuplicates.length > 0){
            for (const booking of bookingDuplicates) {
                const {seat_row, seat_number} = booking;
                seatsList.booked_seats.push({ seat_row, seat_number });
            }
        }

        return structureResponse(seatsList, 1, "Success");
    }

    findAllFiltered = async (query) => {
        let {seat, ...reqBody} = query;

        if (seat !== undefined){
            seat = seat.split("-"); // "A-11" -> ["A",11];
            reqBody.seat_row = seat[0];
            reqBody.seat_number = seat[1];
        }

        let showList = await BookingModel.findAll(reqBody);
        if (!showList.length) {
            throw new NotFoundException('Shows for this movie not found');
        }
        
        return structureResponse(showList, 1, "Success");
    };

    create = async (body) => {
        let {seat, ...bookingBody} = body;
        seat = seat.split("-"); // "A-11" -> ["A",11];
        bookingBody.seat_row = seat[0];
        bookingBody.seat_number = seat[1];

        const result = await BookingModel.create(bookingBody);

        if (!result) {
            throw new CreateFailedException('Booking failed to be created');
        }

        return structureResponse(result, 1, 'Booking was created!');
    }

    update = async (body, id) => {
        const result = await BookingModel.update(body, id);

        if (!result) {
            throw new UnexpectedException('Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        if (!affectedRows) throw new NotFoundException('Booking not found');
        else if (affectedRows && !changedRows) throw new UpdateFailedException('Booking update failed');
        
        return structureResponse(info, 1, 'Booking updated successfully');
    }

    delete = async (id) => {
        const result = await BookingModel.delete(id);
        
        if (!result) {
            throw new NotFoundException('Booking not found');
        }

        return structureResponse({}, 1, 'Booking has been deleted');
    }
}

module.exports = new BookingsRepository;