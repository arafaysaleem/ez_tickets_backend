const sgMail = require('@sendgrid/mail');
const { Config } = require('../configs/config');
const { OTPGenerationException } = require('../utils/exceptions/auth.exception');

sgMail.setApiKey(Config.SENDGRID_API_KEY);

exports.sendOTPEmail = (user, OTP) => {
    const msg = {
        to: user.email, // Change to your recipient
        from: Config.SENDGRID_SENDER, // Change to your verified sender
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