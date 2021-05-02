const { body } = require('express-validator');

exports.createGenreSchema = [
    body('genre')
        .trim()
        .exists()
        .withMessage('Genre name is required')
        .isLength({min: 3})
        .withMessage('Genre name should be atleast 3 letters')
        .isAlpha('en-US', {ignore: ' -'})
        .withMessage('Genre name should be all alphabets')
];

exports.updateGenreSchema = [
    body('genre')
        .optional()
        .trim()
        .isLength({min: 3})
        .withMessage('Genre name should be atleast 3 letters')
        .isAlpha('en-US', {ignore: ' -'})
        .withMessage('Genre name should be all alphabets'),
    body()
        .custom(value => {
            return Object.keys(value).length !== 0;
        })
        .withMessage('Please provide required fields to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ["genre"];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];