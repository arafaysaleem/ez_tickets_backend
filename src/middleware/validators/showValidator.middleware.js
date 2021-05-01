const { body, query } = require('express-validator');
const ShowStatus = require('../../utils/enums/showStatus.utils');
const ShowType = require('../../utils/enums/showTypes.utils');
const { timeRegex } = require('../../utils/common.utils');

exports.createShowSchema = [
    body('start_time')
        .trim()
        .exists()
        .withMessage('Show start time is required')
        .matches(timeRegex)
        .withMessage('Show start must be a valid time of format \'hh:mm\''),
    body('end_time')
        .trim()
        .exists()
        .withMessage('Show start time is required')
        .matches(timeRegex)
        .withMessage('Show end must be a valid time of format \'hh:mm\'')
        .custom((end_time, { req }) => {
            return end_time > req.body.start_time;
        })
        .withMessage('End time must be after start time'),
    body('date')
        .trim()
        .exists()
        .withMessage('Show date is required')
        .isDate({format: 'YYYY-MM-DD', strictMode: true, delimiters: ['-']})
        .withMessage('Show date must be a valid date of format \'YYYY-MM-DD\''),
    body('show_status')
        .trim()
        .exists()
        .withMessage('Show status is required')
        .isIn([...Object.values(ShowStatus)])
        .withMessage('Invalid show status'),
    body('show_type')
        .trim()
        .exists()
        .withMessage('Show type is required')
        .isIn([...Object.values(ShowType)])
        .withMessage('Invalid show type'),
    body('movie_id')
        .trim()
        .exists()
        .withMessage('MovieID is required for the show')
        .isInt()
        .withMessage('Invalid MovieID found'),
    body('theater_id')
        .trim()
        .exists()
        .withMessage('TheaterID is required for the show')
        .isInt()
        .withMessage('Invalid TheaterID found')
];

exports.updateShowSchema = [
    body('show_status')
        .optional()
        .trim()
        .isIn([...Object.values(ShowStatus)])
        .withMessage('Invalid show status'),
    body('show_type')
        .optional()
        .trim()
        .isIn([...Object.values(ShowType)])
        .withMessage('Invalid show type'),
    body('movie_id')
        .optional()
        .trim()
        .isInt()
        .withMessage('Invalid MovieID found'),
    body('start_time')
        .optional()
        .trim()
        .matches(timeRegex)
        .withMessage('Show start must be a valid time of format \'hh:mm\'')
        .custom((start_time, {req}) => {
            if ((req.body.end_time === undefined) || (req.body.date === undefined)
                || (req.body.theater_id === undefined)) return false;
            return true;
        })
        .withMessage('end_time, date, theater_id is required to update show timings'),
    body('end_time')
        .optional()
        .trim()
        .matches(timeRegex)
        .withMessage('Show end must be a valid time of format \'hh:mm\'')
        .custom((end_time, { req }) => {
            return end_time > req.body.start_time;
        })
        .withMessage('End time must be after start time')
        .custom((end_time, {req}) => {
            if ((req.body.start_time === undefined) || (req.body.date === undefined)
                || (req.body.theater_id === undefined)) return false;
            return true;
        })
        .withMessage('start_time, date, theater_id is required to update show timings'),
    body('date')
        .optional()
        .trim()
        .isDate({format: 'YYYY-MM-DD', strictMode: true, delimiters: ['-']})
        .withMessage('Show date must be a valid date of format \'YYYY-MM-DD\'')
        .custom((date, {req}) => {
            if ((req.body.end_time === undefined) || (req.body.start_time === undefined)
                || (req.body.theater_id === undefined)) return false;
            return true;
        })
        .withMessage('end_time, start_time, theater_id is required to update show date'),
    body('theater_id')
        .optional()
        .trim()
        .isInt()
        .withMessage('Invalid TheaterID found')
        .custom((theater_id, {req}) => {
            if ((req.body.end_time === undefined) || (req.body.date === undefined)
                || (req.body.start_time === undefined)) return false;
            return true;
        })
        .withMessage('end_time, start_time, date is required to update show theater'),
    body()
        .custom(value => {
            return Object.keys(value).length !== 0;
        })
        .withMessage('Please provide required fields to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['start_time', 'end_time', 'date', 'show_status', 'movie_id', 'theater_id', 'show_type'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];

exports.showFiltersSchema = [
    query('start_time')
        .optional()
        .trim()
        .matches(timeRegex)
        .withMessage('Show start must be a valid time of format \'hh:mm\''),
    query('end_time')
        .optional()
        .trim()
        .matches(timeRegex)
        .withMessage('Show end must be a valid time of format \'hh:mm\'')
        .custom((end_time, { req }) => {
            return end_time > req.query.start_time;
        })
        .withMessage('End time must be after start time'),
    query('date')
        .optional()
        .trim()
        .isDate({format: 'YYYY-MM-DD', strictMode: true, delimiters: ['-']})
        .withMessage('Show date must be a valid date of format \'YYYY-MM-DD\''),
    query('show_status')
        .optional()
        .trim()
        .isIn([...Object.values(ShowStatus)])
        .withMessage('Invalid show status'),
    query('show_type')
        .optional()
        .trim()
        .isIn([...Object.values(ShowType)])
        .withMessage('Invalid show type'),
    query('movie_id')
        .optional()
        .trim()
        .isInt()
        .withMessage('Invalid MovieID found'),
    query('theater_id')
        .optional()
        .trim()
        .isInt()
        .withMessage('Invalid TheaterID found'),
    query()
        .custom(value => {
            const filters = Object.keys(value);
            const allowFilters = ['start_time', 'end_time', 'date', 'show_status', 'movie_id', 'theater_id', 'show_type'];
            return filters.every(filter => allowFilters.includes(filter));
        })
        .withMessage('Invalid query filters!')
];