const { body } = require('express-validator');

exports.createRoleSchema = [
    body('full_name')
        .exists()
        .withMessage('Full name is required'),
    body('picture_url')
        .exists()
        .withMessage('Picture url is required')
        .isURL()
        .withMessage('Must be a valid url'),
    body('age')
        .exists()
        .withMessage('Role age is required')
        .isNumeric()
        .withMessage('Must be a number')
];

exports.updateRoleSchema = [
    body('full_name')
        .optional(),
    body('picture_url')
        .optional()
        .isURL()
        .withMessage('Must be a valid url'),
    body('age')
        .optional()
        .isNumeric()
        .withMessage('Must be a number'),
    body()
        .custom(value => {
            return Object.keys(value).length !== 0;
        })
        .withMessage('Please provide required fields to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ["full_name", "age", "picture_url"];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];