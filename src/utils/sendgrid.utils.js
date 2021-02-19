const dotenv = require('dotenv');
dotenv.config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const { OTPGenerationException } = require('../utils/exceptions/auth.exception');

exports.sendOTPEmail = (user,OTP) => {
    const msg = {
        to: user.email, // Change to your recipient
        from: process.env.SENDGRID_SENDER, // Change to your verified sender
        subject: 'EZ Tickets password reset',
        text: `Hi ${user.full_name} \n 
        Please note and enter the following code ${OTP} to reset your password. \n\n 
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    }

    sgMail.send(msg, (err, result) => {
        if(error) {
            console.log(error);
            throw new OTPGenerationException(error.message);
        }
        console.log(result);
    })
}
