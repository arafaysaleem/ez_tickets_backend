const { body } = require('express-validator');
const PaymentMethods = require('../../utils/enums/paymentMethods.utils');
const { datetimeRegex } = require('../../utils/common.utils');

exports.createPaymentSchema = [
    body('amount')
        .trim()
        .exists()
        .withMessage('Payment amount is required')
        .isInt({min: 1})
        .withMessage('Invalid amount found'),
    body('payment_method')
        .trim()
        .exists()
        .withMessage('Payment method is required')
        .isIn([...Object.values(PaymentMethods)])
        .withMessage('Invalid payment method'),
    body('payment_datetime')
        .trim()
        .exists()
        .withMessage('Payment datetime is required')
        .matches(datetimeRegex)
        .withMessage('Payment datetime should be valid datetime of format \'YYYY-MM-DD HH:mm:ss\'')
];

exports.updatePaymentSchema = [
    body('amount')
        .optional()
        .trim()
        .isInt({min: 1})
        .withMessage('Invalid amount found'),
    body('payment_method')
        .optional()
        .trim()
        .isIn([...Object.values(PaymentMethods)])
        .withMessage('Invalid payment method'),
    body('payment_datetime')
        .optional()
        .trim()
        .matches(datetimeRegex)
        .withMessage('Payment datetime should be valid datetime of format \'YYYY-MM-DD HH:mm:ss\''),
    body()
        .custom(value => {
            return Object.keys(value).length !== 0;
        })
        .withMessage('Please provide required fields to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['amount', 'payment_method', 'payment_datetime'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];