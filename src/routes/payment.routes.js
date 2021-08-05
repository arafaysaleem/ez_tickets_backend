const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const paymentController = require('../controllers/payment.controller');
const UserRole = require('../utils/enums/userRoles.utils');
const {
    createPaymentSchema, updatePaymentSchema
} = require('../middleware/validators/paymentValidator.middleware');

router.get('/', auth(), awaitHandlerFactory(paymentController.getAllPayments)); // localhost:3000/api/v1/payments
router.get('/id/:id', auth(), awaitHandlerFactory(paymentController.getPaymentById)); // localhost:3000/api/v1/payments/id/1
router.get('/users/:id', auth(), awaitHandlerFactory(paymentController.getUserPayments)); // localhost:3000/api/v1/payments/users/1
router.post('/', auth(), createPaymentSchema, awaitHandlerFactory(paymentController.createPayment)); // localhost:3000/api/v1/payments
router.patch('/id/:id', auth(UserRole.Admin), updatePaymentSchema, awaitHandlerFactory(paymentController.updatePayment)); // localhost:3000/api/v1/payments/id/1
router.delete('/id/:id', auth(UserRole.Admin), awaitHandlerFactory(paymentController.deletePayment)); // localhost:3000/api/v1/payments/id/1

module.exports = router;