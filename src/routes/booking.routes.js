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
router.get('/id/:id', auth(), awaitHandlerFactory(bookingController.getBookingById)); // localhost:3000/api/v1/bookings
router.get('/filters', auth(), bookingGetFiltersSchema, awaitHandlerFactory(bookingController.getFilteredBookings)); // localhost:3000/api/v1/bookings/filters
router.post('/', auth(UserRole.Admin, UserRole.SuperUser), createBookingSchema, awaitHandlerFactory(bookingController.createBooking)); // localhost:3000/api/v1/bookings
router.patch('/id/:id', auth(UserRole.Admin, UserRole.SuperUser), updateBookingSchema, awaitHandlerFactory(bookingController.updateBooking)); // localhost:3000/api/v1/bookings/filters
router.delete('/id/:id', auth(UserRole.Admin, UserRole.SuperUser), awaitHandlerFactory(bookingController.deleteBooking)); // localhost:3000/api/v1/bookings/filters

module.exports = router;