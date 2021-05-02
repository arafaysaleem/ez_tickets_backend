const { body, query } = require('express-validator');
const MovieType = require('../../utils/enums/movieTypes.utils');
const RoleType = require('../../utils/enums/roleTypes.utils');
const { yearRegex } = require('../../utils/common.utils');

exports.createMovieSchema = [
    body('title')
        .trim()
        .exists()
        .withMessage('Movie title is required'),
    body('year')
        .trim()
        .exists()
        .withMessage('Movie year is required')
        .matches(yearRegex)
        .withMessage('Movie year must be a valid year'),
    body('summary')
        .trim()
        .exists()
        .withMessage('Summary is required'),
    body('rating')
        .optional()
        .trim()
        .isDecimal({force_decimal: true, decimal_digits: '1'})
        .withMessage('Rating should a valid decimal (0.0)')
        .isFloat({min: 0.1, max: 9.9})
        .withMessage('Rating should in range [0.1-9.9]'),
    body('trailer_url')
        .trim()
        .exists()
        .withMessage('Trailer url is required')
        .isURL()
        .withMessage('Must be a valid url'),
    body('poster_url')
        .trim()
        .exists()
        .withMessage('Poster url is required')
        .isURL()
        .withMessage('Must be a valid url'),
    body('movie_type')
        .trim()
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
        .trim()
        .exists()
        .withMessage('RoleId is required for each role')
        .bail()
        .isInt({min: 1})
        .withMessage('Invalid RoleId found'),
    body('roles.*.role_type')
        .trim()
        .exists()
        .withMessage('RoleType is required for each role')
        .bail()
        .isIn([...Object.values(RoleType)])
        .withMessage('Invalid RoleType'),
    body('genres')
        .exists()
        .withMessage('Movie genres is required')
        .bail()
        .isArray()
        .withMessage('Genres must be an array like [1, 9]')
        .bail()
        .notEmpty()
        .withMessage('Genres can\'t be empty'),
    body('genres.*')
        .trim()
        .exists()
        .withMessage('GenreId is required for each genre')
        .bail()
        .isInt({min: 1})
        .withMessage('Invalid GenreId found')
];

exports.updateMovieSchema = [
    body('title')
        .optional()
        .trim(),
    body('year')
        .optional()
        .trim()
        .matches(yearRegex)
        .withMessage('Movie year must be a valid year'),
    body('summary')
        .optional()
        .trim(),
    body('rating')
        .optional()
        .trim()
        .isDecimal({force_decimal: true, decimal_digits: '1'})
        .withMessage('Rating should a valid decimal (0.0)')
        .isFloat({min: 0.1, max: 9.9})
        .withMessage('Rating should in range [0.1-9.9]'),
    body('trailer_url')
        .optional()
        .trim()
        .isURL()
        .withMessage('Must be a valid url'),
    body('poster_url')
        .optional()
        .trim()
        .isURL()
        .withMessage('Must be a valid url'),
    body('movie_type')
        .optional()
        .trim()
        .isIn([...Object.values(MovieType)])
        .withMessage('Invalid movie type'),
    body()
        .custom(value => {
            return Object.keys(value).length !== 0;
        })
        .withMessage('Please provide required fields to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['title', 'year', 'summary', 'rating', 'trailer_url', 'poster_url', 'movie_type'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];

exports.movieFiltersSchema = [
    query('movie_type')
        .optional()
        .trim()
        .isIn([...Object.values(MovieType)])
        .withMessage('Invalid movie type'),
    query()
        .custom(value => {
            const filters = Object.keys(value);
            const allowFilters = ['movie_type'];
            return filters.every(filter => allowFilters.includes(filter));
        })
        .withMessage('Invalid query filters!')
];