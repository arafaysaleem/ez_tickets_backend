const { body } = require('express-validator');
const UserRole = require('../../utils/enums/userRoles.utils');


exports.createUserSchema = [
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
        .isIn([...Object.values(UserRole)])
        .withMessage('Invalid UserRole type'),
    body('password')
        .exists()
        .withMessage('Password is required')
        .notEmpty(),
    body('contact')
        .exists()
        .withMessage('Contact is required')
        .isMobilePhone('en-PK', {strictMode: true})
        .withMessage('Must be a valid Pakistan mobile number along with country code')
];

exports.updateUserSchema = [
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
        .isIn([...Object.values(UserRole)])
        .withMessage('Invalid UserRole type'),
    body('contact')
        .optional()
        .isMobilePhone('en-PK', {strictMode: true})
        .withMessage('Must be a valid Pakistan mobile number along with country code'),
    body()
        .custom(value => {
            return Object.keys(value).length !== 0;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['full_name', 'email', 'role', 'contact', 'address'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];