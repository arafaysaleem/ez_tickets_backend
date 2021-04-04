const { body, query } = require('express-validator');
const BookingStatus = require('../../utils/enums/bookingStatus.utils');
const { seatRegex, datetimeRegex } = require('../../utils/common.utils');

exports.createBookingSchema = [
    body('user_id')
        .trim()
        .exists()
        .withMessage('UserID is required for the booking')
        .isInt({ min: 1 })
        .withMessage('Invalid UserID found'),
    body('booking_status')
        .trim()
        .exists()
        .withMessage('Booking status is required')
        .isIn([...Object.values(BookingStatus)])
        .withMessage('Invalid booking status'),
    body('show_id')
        .trim()
        .exists()
        .withMessage('ShowID is required for the booking')
        .isInt({ min: 1 })
        .withMessage('Invalid ShowID found'),
    body('seat')
        .trim()
        .exists()
        .withMessage('Seat is required for the booking')
        .isString()
        .withMessage('Seat has to be a string')
        .matches(seatRegex)
        .withMessage('Invalid seat id found. Follow format \'A-11\''),
    body('price')
        .trim()
        .exists()
        .withMessage('Ticket price is required for the booking')
        .isInt({ min: 1 })
        .withMessage('Price should a valid whole number > 0'),
    body('booking_datetime')
        .trim()
        .exists()
        .withMessage('Booking datetime is required')
        .matches(datetimeRegex)
        .withMessage('Booking datetime should be valid datetime of format \'YYYY-MM-DD HH:mm:ss\'')
];

exports.updateBookingSchema = [
    body('booking_status')
        .optional()
        .trim()
        .isIn([...Object.values(BookingStatus)])
        .withMessage('Invalid booking status'),
    body()
        .custom(value => {
            return Object.keys(value).length !== 0;
        })
        .withMessage('Please provide required fields to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['booking_status'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];

exports.bookingGetFiltersSchema = [
    query('user_id')
        .optional()
        .trim()
        .isInt({ min: 1 })
        .withMessage('Invalid UserID found'),
    query('booking_status')
        .optional()
        .trim()
        .isIn([...Object.values(BookingStatus)])
        .withMessage('Invalid booking status'),
    query('show_id')
        .optional()
        .trim()
        .isInt({ min: 1 })
        .withMessage('Invalid ShowID found'),
    query('seat')
        .optional()
        .trim()
        .isString()
        .withMessage('Seat has to be a string')
        .matches(seatRegex)
        .withMessage('Invalid seat id found. Follow format \'A-11\''),
    query('price')
        .optional()
        .trim()
        .isInt({ min: 1 })
        .withMessage('Price should a valid whole number > 0'),
    query('booking_datetime')
        .optional()
        .trim()
        .matches(datetimeRegex)
        .withMessage('Booking datetime should be valid datetime of format \'YYYY-MM-DD HH:mm:ss\''),
    query()
        .custom(value => {
            const filters = Object.keys(value);
            const allowFilters = ['user_id', 'booking_status', 'show_id', 'seat', 'price', 'booking_datetime'];
            return filters.every(filter => allowFilters.includes(filter));
        })
        .withMessage('Invalid query filters!')
];