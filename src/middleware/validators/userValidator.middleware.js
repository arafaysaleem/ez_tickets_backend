const { body } = require('express-validator');
const Role = require('../../utils/userRoles.utils');


exports.createUserSchema = [
    // body('username')
    //     .exists()
    //     .withMessage('username is required')
    //     .isLength({ min: 3 })
    //     .withMessage('Must be at least 3 chars long'),
    body('full_name')
        .exists()
        .withMessage('Your full name is required')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('address')
        .exists()
        .withMessage('Your address is required'),
    body('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
    body('role')
        .optional()
        .isIn([Role.Admin, Role.SuperUser, Role.ApiUser])
        .withMessage('Invalid Role type'),
    body('password')
        .exists()
        .withMessage('Password is required')
        .notEmpty(),
    body('contact')
        .exists()
        .withMessage('Contact is required')
        .isNumeric()
        .withMessage('Must be a valid contact number')
];

exports.updateUserSchema = [
    // body('username')
    //     .optional()
    //     .isLength({ min: 3 })
    //     .withMessage('Must be at least 3 chars long'),
    body('full_name')
        .optional()
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('address')
        .optional(),
    body('email')
        .optional()
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
    body('role')
        .optional()
        .isIn([Role.Admin, Role.SuperUser, Role.ApiUser])
        .withMessage('Invalid Role type'),
    body('password')
        .optional()
        .notEmpty(),
    body('contact')
        .optional()
        .isNumeric()
        .withMessage('Must be a valid contact number'),
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['full_name', 'email', 'password', 'role', 'contact', 'address'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];

exports.validateLogin = [
    body('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
    body('password')
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .withMessage('Password must be filled')
];