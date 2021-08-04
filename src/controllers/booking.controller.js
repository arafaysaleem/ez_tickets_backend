const { checkValidation } = require('../middleware/validation.middleware');

const BookingsRepository = require('../repositories/bookings.repository');

class BookingController {
    getAllBookings = async (req, res, next) => {
        const response = await BookingsRepository.findAll();
        res.send(response);
    };

    getBookingById = async (req, res, next) => {
        const response = await BookingsRepository.findOne({booking_id: req.params.id});
        res.send(response);
    };

    getFilteredBookings = async (req, res, next) => {
        checkValidation(req);
        const response = await BookingsRepository.findAll(req.query);
        res.send(response);
    };

    getUserBookings = async (req, res, next) => {
        const response = await BookingsRepository.findAllByUser(req.params.id, req.query);
        res.send(response);
    };

    getShowBookings = async (req, res, next) => {
        const response = await BookingsRepository.findAllByShow(req.params.id);
        res.send(response);
    };

    createBooking = async (req, res, next) => {
        checkValidation(req);
        const response = await BookingsRepository.create(req.body);
        res.status(201).send(response);
    };

    updateBooking = async (req, res, next) => {
        checkValidation(req);
        const response = await BookingsRepository.update(req.body, req.params.id);
        res.send(response);
    };

    deleteBooking = async (req, res, next) => {
        const response = await BookingsRepository.delete(req.params.id);
        res.send(response);
    };
}

module.exports = new BookingController;