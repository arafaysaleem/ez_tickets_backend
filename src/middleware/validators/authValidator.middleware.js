const { body } = require('express-validator');
const { OTPRegex } = require('../../utils/common.utils');


exports.forgetPWSchema = [
    body('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
];

exports.changePWSchema = [
    body('password')
        .exists()
        .withMessage('Password is required')
        .notEmpty(),
    body('new_password')
        .exists()
        .withMessage('New password is required')
        .notEmpty(),
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
    .notEmpty(),
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