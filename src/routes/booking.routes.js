const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const bookingController = require('../controllers/booking.controller');
const UserRole = require('../utils/enums/userRoles.utils');
const {
    createBookingSchema, updateBookingSchema, bookingGetFiltersSchema
} = require('../middleware/validators/bookingValidator.middleware');

router.get('/', auth(), awaitHandlerFactory(bookingController.getAllBookings)); // localhost:3000/api/v1/bookings
router.get('/id/:id', auth(), awaitHandlerFactory(bookingController.getBookingById)); // localhost:3000/api/v1/bookings/id/1
router.get('/filters', auth(), bookingGetFiltersSchema, awaitHandlerFactory(bookingController.getFilteredBookings)); // localhost:3000/api/v1/bookings/filters
router.get('/users/:id', auth(), awaitHandlerFactory(bookingController.getUserBookings)); // localhost:3000/api/v1/bookings/users/1
router.get('/shows/:id', auth(), awaitHandlerFactory(bookingController.getShowBookings)); // localhost:3000/api/v1/bookings/shows/14
router.post('/', auth(), createBookingSchema, awaitHandlerFactory(bookingController.createBooking)); // localhost:3000/api/v1/bookings
router.patch('/id/:id', auth(UserRole.Admin), updateBookingSchema, awaitHandlerFactory(bookingController.updateBooking)); // localhost:3000/api/v1/bookings/id/1
router.delete('/id/:id', auth(UserRole.Admin), awaitHandlerFactory(bookingController.deleteBooking)); // localhost:3000/api/v1/bookings/id/1

module.exports = router;