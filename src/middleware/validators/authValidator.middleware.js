const { body } = require('express-validator');
const { OTPRegex } = require('../../utils/common.utils');


exports.forgotPWSchema = [
    body('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
];

exports.changePWSchema = [
    body('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
    body('password')
        .exists()
        .withMessage('Password field is required')
        .notEmpty()
        .withMessage('Password must be filled'),
    body('new_password')
        .exists()
        .withMessage('New password field is required')
        .notEmpty()
        .withMessage('New password must be filled')
        .custom((value, { req }) => value !== req.body.password)
        .withMessage('New password can\'t be the same as the old password'),
]

exports.resetPWSchema = [
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
    .withMessage('Password must be filled'),
]

exports.verifyOTPSchema = [
    body('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
    body('OTP')
        .exists()
        .withMessage('OTP is required')
        .matches(OTPRegex)
        .withMessage('OTP must be 4 digits')
        .isString()
        .withMessage('OTP must be a string')
];

exports.validateLogin = [
    body('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email') //todo: add email verification
        .normalizeEmail(),
    body('password')
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .withMessage('Password must be filled')
];