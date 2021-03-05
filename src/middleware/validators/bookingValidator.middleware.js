const { body } = require('express-validator');
const BookingStatus = require('../../utils/enums/bookingStatus.utils');
const { seatRegex, datetimeRegex } = require('../../utils/common.utils');

exports.createBookingSchema = [
    body('user_id')
        .exists()
        .withMessage('UserID is required for the booking')
        .isInt({ min: 1 })
        .withMessage('Invalid UserID found'),
    body('booking_status')
        .exists()
        .withMessage('Booking status is required')
        .isIn([...Object.values(BookingStatus)])
        .withMessage('Invalid booking status'),
    body('show_id')
        .exists()
        .withMessage('ShowID is required for the booking')
        .isInt({ min: 1 })
        .withMessage('Invalid ShowID found'),
    body('seat')
        .exists()
        .withMessage('Seat is required for the booking')
        .isString()
        .withMessage('Seat has to be a string')
        .matches(seatRegex)
        .withMessage('Invalid seat id found. Follow format \'A-11\''),
    body('price')
        .exists()
        .withMessage('Ticket price is required for the booking')
        .isInt({ min: 1 })
        .withMessage('Price should a valid whole number > 0'),
    body('booking_datetime')
        .exists()
        .withMessage('Booking datetime is required')
        .matches(datetimeRegex)
        .withMessage('Booking datetime should be valid datetime of format \'YYYY-MM-DD HH:mm:ss\'')
];

exports.updateBookingSchema = [
    body('booking_status')
        .optional()
        .isIn([...Object.values(BookingStatus)])
        .withMessage('Invalid booking status'),
    body('seat')
        .optional()
        .isString()
        .withMessage('Seat has to be a string')
        .matches(seatRegex)
        .withMessage('Invalid seat id found. Follow format \'A-11\'')
        .custom((seat, {req}) => {
            if (req.body.filters.show_id === undefined
                || req.body.filters.user_id === undefined
                || req.body.filters.seat === undefined){
                return false;
            }
            return true;
        })
        .withMessage('Please provide show_id and user_id & old seat to update seat'),
    body('price')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Price should a valid whole number > 0'),
    body('filters')
        .exists()
        .withMessage('Please enter update where conditions')
        .custom((filters) => {
            if (filters instanceof Object) { // if a json
                return true;
            }
            return false;
        })
        .withMessage('Filters have to be a json')
        .custom((filters) => {
            if (Object.keys(filters).length !== 0){ // if no filters
                return true;
            }
            return false;
        })
        .withMessage('Filters can\'t be empty'),
    body('filters.*')
        .notEmpty()
        .withMessage('Must specify some filters'),
    body('filters.user_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Invalid UserID found'),
    body('filters.booking_status')
        .optional()
        .isIn([...Object.values(BookingStatus)])
        .withMessage('Invalid booking status'),
    body('filters.show_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Invalid ShowID found'),
    body('filters.seat')
        .optional()
        .isString()
        .withMessage('Seat has to be a string')
        .matches(seatRegex)
        .withMessage('Invalid seat id found. Follow format \'A-11\''),
    body()
        .custom(value => {
            return Object.keys(value).length !== 0;
        })
        .withMessage('Please provide required fields to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['booking_status', 'price', 'seat', 'filters',
                'filters.user_id', 'filters.booking_status', 'filters.show_id'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];

exports.bookingGetFiltersSchema = [
    body('user_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Invalid UserID found'),
    body('booking_status')
        .optional()
        .isIn([...Object.values(BookingStatus)])
        .withMessage('Invalid booking status'),
    body('show_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Invalid ShowID found'),
    body('seat')
        .optional()
        .isString()
        .withMessage('Seat has to be a string')
        .matches(seatRegex)
        .withMessage('Invalid seat id found. Follow format \'A-11\''),
    body('price')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Price should a valid whole number > 0'),
    body('booking_datetime')
        .optional()
        .matches(datetimeRegex)
        .withMessage('Booking datetime should be valid datetime of format \'YYYY-MM-DD HH:mm:ss\'')
];

exports.bookingDeleteFiltersSchema = [
    body('user_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Invalid UserID found'),
    body('booking_status')
        .optional()
        .isIn([...Object.values(BookingStatus)])
        .withMessage('Invalid booking status'),
    body('show_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Invalid ShowID found'),
    body('seat')
        .optional()
        .isString()
        .withMessage('Seat has to be a string')
        .matches(seatRegex)
        .withMessage('Invalid seat id found. Follow format \'A-11\'')
        .custom((seat, { req }) => {
            if (req.body.show_id === undefined && req.body.user_id === undefined) {
                return false;
            }
            return true;
        })
        .withMessage("Must specify user_id or show_id or both")
];