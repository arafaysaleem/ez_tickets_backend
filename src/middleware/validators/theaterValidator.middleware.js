const { body } = require('express-validator');
const { seatRegex } = require('../../utils/common.utils');
const TheaterType = require('../../utils/enums/theaterTypes.utils');

exports.createTheaterSchema = [
    body('theater_name')
        .trim()
        .exists()
        .withMessage('Theater name is required')
        .isLength({min: 1, max: 1})
        .withMessage('Theater name must be a single letter')
        .isAlpha()
        .withMessage('Must be alphabetic')
        .toUpperCase(),
    body('seats_per_row')
        .trim()
        .exists()
        .withMessage('Define max number of seats for a row')
        .isInt({min: 1})
        .withMessage('Seats per row has to be a whole number >= 1'),
    body('num_of_rows')
        .trim()
        .exists()
        .withMessage('Define num of rows in theater')
        .isInt({min: 1, max: 12})
        .withMessage('Num of rows has to be a whole number between 1 and 12'),
    body('theater_type')
        .trim()
        .exists()
        .withMessage('Theater type is required')
        .isIn([...Object.values(TheaterType)])
        .withMessage('Invalid theater type'),
    body('missing')
        .optional()
        .isArray()
        .withMessage("Missing must be an array like ['A-11','B-12','F-21',...]")
        .bail()
        .notEmpty()
        .withMessage('Missing can\'t be empty'),
    body('missing.*')
        .trim()
        .exists()
        .withMessage('Missing seats are required for "missing" key')
        .bail()
        .isString()
        .withMessage('Each seat has to be a string')
        .matches(seatRegex)
        .withMessage('Invalid seat id found. Follow format \'A-11\''),
    body('blocked')
        .optional()
        .isArray()
        .withMessage('Blocked must be an array like [\"A-11\",\"B-12\",\"F-21\",...]')
        .bail()
        .notEmpty()
        .withMessage('Blocked can\'t be empty'),
    body('blocked.*')
        .trim()
        .exists()
        .withMessage('Blocked seats are required for "blocked" key')
        .bail()
        .isString()
        .withMessage('Each seat has to be a string')
        .matches(seatRegex)
        .withMessage('Invalid seat id found. Follow format \'A-11\'')
];

exports.updateTheaterSchema = [
    body('theater_name')
        .optional()
        .trim()
        .isLength({min: 1, max: 1})
        .withMessage('Theater name must be a single letter')
        .isAlpha()
        .withMessage('Must be alphabetic')
        .toUpperCase(),
    body('seats_per_row')
        .optional()
        .trim()
        .isInt({min: 1})
        .withMessage('Seats per row has to be a whole number >= 1'),
    body('num_of_rows')
        .optional()
        .trim()
        .isInt({min: 1, max: 12})
        .withMessage('Num of rows has to be a whole number between 1 and 12'),
    body('theater_type')
        .optional()
        .trim()
        .isIn([...Object.values(TheaterType)])
        .withMessage('Invalid theater type'),
    body()
        .custom(value => {
            return Object.keys(value).length !== 0;
        })
        .withMessage('Please provide required fields to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['theater_name', 'seats_per_row', 'num_of_rows', 'theater_type'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];