const { body } = require('express-validator');
const ShowStatus = require('../../utils/enums/showStatus.utils');
const { timeRegex } = require('../../utils/common.utils');

exports.createShowSchema = [
    body('start_time')
        .exists()
        .withMessage('Show start time is required')
        .matches(timeRegex)
        .withMessage('Show start must be a valid time of format \'hh:mm\''),
    body('end_time')
        .exists()
        .withMessage('Show start time is required')
        .matches(timeRegex)
        .withMessage('Show start must be a valid time of format \'hh:mm\''),
    body('date')
        .exists()
        .withMessage('Show date is required')
        .isDate()
        .withMessage('Show date must be a valid date'),
    body('show_status')
        .exists()
        .withMessage('Show status is required')
        .isIn([...Object.values(ShowStatus)])
        .withMessage('Invalid show status'),
    body('movie_id')
        .exists()
        .withMessage('MovieID is required for the show')
        .isInt()
        .withMessage('Invalid RoleId found'),
    body('theater_id')
        .exists()
        .withMessage('TheaterID is required for the show')
        .isInt()
        .withMessage('Invalid RoleId found')
];

exports.updateShowSchema = [
    body('start_time')
        .optional()
        .matches(timeRegex)
        .withMessage('Show start must be a valid time of format \'hh:mm\''),
    body('end_time')
        .optional()
        .matches(timeRegex)
        .withMessage('Show start must be a valid time of format \'hh:mm\''),
    body('date')
        .optional()
        .isDate()
        .withMessage('Show date must be a valid date'),
    body('show_status')
        .optional()
        .isIn([...Object.values(ShowStatus)])
        .withMessage('Invalid show status'),
    body('movie_id')
        .optional()
        .isInt()
        .withMessage('Invalid RoleId found'),
    body('theater_id')
        .optional()
        .isInt()
        .withMessage('Invalid RoleId found'),
    body()
        .custom(value => {
            return Object.keys(value).length !== 0;
        })
        .withMessage('Please provide required fields to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['start_time', 'end_time', 'date', 'show_status', 'movie_id', 'theater_id'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];