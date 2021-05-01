const { body } = require('express-validator');
const { OTPRegex } = require('../../utils/common.utils');
const EmailValidator = require('deep-email-validator');


exports.forgotPWSchema = [
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
        .normalizeEmail()
];

exports.changePWSchema = [
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
    body('password')
        .trim()
        .exists()
        .withMessage('Password field is required')
        .notEmpty()
        .withMessage('Password must be filled'),
    body('new_password')
        .trim()
        .exists()
        .withMessage('New password field is required')
        .notEmpty()
        .withMessage('New password must be filled')
        .custom((value, { req }) => value !== req.body.password)
        .withMessage('New password can\'t be the same as the old password')
];

exports.resetPWSchema = [
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
    body('password')
        .trim()
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .withMessage('Password must be filled')
];

exports.verifyOTPSchema = [
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
    body('OTP')
        .trim()
        .exists()
        .withMessage('OTP is required')
        .matches(OTPRegex)
        .withMessage('OTP must be 4 digits')
        .isString()
        .withMessage('OTP must be a string')
];

exports.validateLogin = [
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
    body('password')
        .trim()
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .withMessage('Password must be filled')
];

exports.validateRefresh = [
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
    body('password')
        .trim()
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .withMessage('Password must be filled'),
    body('oldToken')
        .trim()
        .exists()
        .withMessage('Old token is required for refreshing')
        .isJWT()
        .withMessage('Invalid token format')
];