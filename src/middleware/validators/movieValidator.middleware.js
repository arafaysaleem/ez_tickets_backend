const { body } = require('express-validator');
const MovieType = require('../../utils/movieTypes.utils');
const RoleType = require('../../utils/roleTypes.utils');
const { yearRegex } = require('../../utils/common.utils');

exports.createMovieSchema = [
    body('title')
        .exists()
        .withMessage('Movie title is required'),
    body('year')
        .exists()
        .withMessage('Movie year is required')
        .matches(yearRegex)
        .withMessage('Movie year must be a valid year'),
    body('summary')
        .exists()
        .withMessage('Summary is required'),
    body('rating')
        .optional()
        .isDecimal({force_decimal: true, decimal_digits: '1'})
        .withMessage('Rating should a valid decimal (0.0)'),
    body('trailer_url')
        .exists()
        .withMessage('Trailer url is required')
        .isURL()
        .withMessage('Must be a valid url'),
    body('poster_url')
        .exists()
        .withMessage('Poster url is required')
        .isURL()
        .withMessage('Must be a valid url'),
    body('movie_type')
        .exists()
        .withMessage('Movie type is required')
        .isIn([...Object.values(MovieType)])
        .withMessage('Invalid movie type'),
    body('roles')
        .exists()
        .withMessage('Movie roles is required')
        .bail()
        .isArray()
        .withMessage('Roles must be an array like [{role_id : 1, role_type: \'cast\'},{...}]')
        .bail()
        .notEmpty()
        .withMessage('Roles can\'t be empty'),
    body('roles.*.role_id')
        .exists()
        .withMessage('RoleId is required for each role')
        .bail()
        .isInt()
        .withMessage('Invalid RoleId found'),
    body('roles.*.role_type')
        .exists()
        .withMessage('RoleType is required for each role')
        .bail()
        .isIn([...Object.values(RoleType)])
        .withMessage('Invalid RoleType'),
];

exports.updateMovieSchema = [
    body('title')
        .optional(),
    body('year')
        .optional()
        .matches(yearRegex)
        .withMessage('Movie year must be a valid year'),
    body('summary')
        .optional(),
    body('rating')
        .optional()
        .isDecimal({force_decimal: true, decimal_digits: '1'})
        .withMessage('Rating should a valid decimal (0.0)'),
    body('trailer_url')
        .optional()
        .isURL()
        .withMessage('Must be a valid url'),
    body('poster_url')
        .optional()
        .isURL()
        .withMessage('Must be a valid url'),
    body('movie_type')
        .optional()
        .isIn([...Object.values(MovieType)])
        .withMessage('Invalid movie type'),
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required fields to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['title', 'year', 'summary', 'rating', 'trailer_url', 'poster_url', 'movie_type'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];