const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const bookingController = require('../controllers/booking.controller');
const UserRole = require('../utils/enums/userRoles.utils');
const {
    createBookingSchema, updateBookingSchema,
    bookingGetFiltersSchema, bookingDeleteFiltersSchema
} = require('../middleware/validators/bookingValidator.middleware');

router.get('/', auth(), awaitHandlerFactory(bookingController.getAllBookings)); // localhost:3000/api/v1/bookings
router.post('/filters', auth(), bookingGetFiltersSchema, awaitHandlerFactory(bookingController.getFilteredBookings)); // localhost:3000/api/v1/bookings/filters
router.post('/', auth(UserRole.Admin, UserRole.SuperUser), createBookingSchema, awaitHandlerFactory(bookingController.createBooking)); // localhost:3000/api/v1/bookings
router.patch('/filters', auth(UserRole.Admin, UserRole.SuperUser), updateBookingSchema, awaitHandlerFactory(bookingController.updateBooking)); // localhost:3000/api/v1/bookings/filters
router.delete('/filters', auth(UserRole.Admin, UserRole.SuperUser), bookingDeleteFiltersSchema, awaitHandlerFactory(bookingController.deleteBooking)); // localhost:3000/api/v1/bookings/filters

module.exports = router;