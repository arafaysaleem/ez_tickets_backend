const { body } = require('express-validator');
const UserRole = require('../../utils/enums/userRoles.utils');
const EmailValidator = require('deep-email-validator');


exports.createUserSchema = [
    body('full_name')
        .trim()
        .exists()
        .withMessage('Your full name is required')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('address')
        .trim()
        .exists()
        .withMessage('Your address is required'),
    body('email')
        .trim()
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .custom(async (email) => {
            const {valid} = await EmailValidator.validate(email);
            return valid;
        })
        .withMessage('Email unrecognized')
        .normalizeEmail(),
    body('role')
        .optional()
        .trim()
        .isIn([...Object.values(UserRole)])
        .withMessage('Invalid UserRole type'),
    body('password')
        .trim()
        .exists()
        .withMessage('Password is required')
        .notEmpty(),
    body('contact')
        .trim()
        .exists()
        .withMessage('Contact is required')
        .isMobilePhone('en-PK', {strictMode: true})
        .withMessage('Must be a valid Pakistan mobile number along with country code')
];

exports.updateUserSchema = [
    body('full_name')
        .optional()
        .trim()
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('address')
        .optional(),
    body('email')
        .optional()
        .trim()
        .isEmail()
        .withMessage('Must be a valid email')
        .custom(async (email) => {
            const {valid} = await EmailValidator.validate(email);
            return valid;
        })
        .withMessage('Email unrecognized')
        .normalizeEmail(),
    body('role')
        .optional()
        .trim()
        .isIn([...Object.values(UserRole)])
        .withMessage('Invalid UserRole type'),
    body('contact')
        .optional()
        .trim()
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