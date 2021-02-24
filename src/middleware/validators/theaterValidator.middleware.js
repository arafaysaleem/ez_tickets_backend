const { body } = require('express-validator');
const seatRegex = require('../utils/common.utils');

exports.createTheaterSchema = [
    body('theater_name')
        .exists()
        .withMessage('Theater name is required')
        .isLength({min: 1, max: 1})
        .withMessage('Theater name must be a single letter')
        .isAlpha()
        .withMessage('Must be alphabetic')
        .toUpperCase(),
    body('seats_per_row')
        .exists()
        .withMessage('Define max number of seats for a row')
        .isInt({min: 1})
        .withMessage('Seats per row has to be a whole number >= 1'),
    body('num_of_rows')
        .exists()
        .withMessage('Define num of rows in theater')
        .isInt({min: 1})
        .withMessage('Num of rows has to be a whole number >= 1'),
    body('missing')
        .optional()
        .isArray()
        .withMessage('Missing must be an array like ["A-11","B-12","F-21",...]')
        .bail()
        .notEmpty()
        .withMessage('Missing can\'t be empty'),
    body('missing.*')
        .exists()
        .withMessage('Missing seats are required for in case of "missing" key')
        .bail()
        .matches(seatRegex)
        .withMessage('Invalid seat id found'),
    body('blocked')
        .optional()
        .isArray()
        .withMessage('Blocked must be an array like ["A-11","B-12","F-21",...]')
        .bail()
        .notEmpty()
        .withMessage('Blocked can\'t be empty'),
    body('blocked.*')
        .exists()
        .withMessage('Blocked seats are required for in case of "blocked" key')
        .bail()
        .matches(seatRegex)
        .withMessage('Invalid seat id found')
];

exports.updateTheaterSchema = [
    body('theater_name')
        .optional()
        .isLength({min: 1, max: 1})
        .withMessage('Theater name must be a single letter')
        .isAlpha()
        .withMessage('Must be alphabetic')
        .toUpperCase(),
    body('seats_per_row')
        .optional()
        .isInt({min: 1})
        .withMessage('Seats per row has to be a whole number >= 1'),
    body('num_of_rows')
        .optional()
        .isInt({min: 1})
        .withMessage('Num of rows has to be a whole number >= 1'),
    body()
        .custom(value => {
            return Object.keys(value).length !== 0;
        })
        .withMessage('Please provide required fields to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['theater_name', 'seats_per_row', 'num_of_rows'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];