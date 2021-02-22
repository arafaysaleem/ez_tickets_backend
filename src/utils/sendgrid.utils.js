const dotenv = require('dotenv');
dotenv.config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const { OTPGenerationException } = require('../utils/exceptions/auth.exception');

exports.sendOTPEmail = (user, OTP) => {
    const msg = {
        to: user.email, // Change to your recipient
        from: process.env.SENDGRID_SENDER, // Change to your verified sender
        subject: 'EZ Tickets password reset',
        templateId: 'd-a78a15d6feb442618af35cc1dfea2076',
        dynamic_template_data: {full_name: user.full_name, OTP}
    };

    sgMail.send(msg, (err, result) => {
        if (err) {
            console.log(err);
            throw new OTPGenerationException(err.message);
        }
    });
};