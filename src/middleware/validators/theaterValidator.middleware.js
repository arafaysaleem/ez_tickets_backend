const { body } = require('express-validator');

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
        .withMessage('Num of rows has to be a whole number >= 1')
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