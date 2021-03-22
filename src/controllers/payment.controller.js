const { checkValidation } = require('../middleware/validation.middleware');
const { structureResponse } = require('../utils/common.utils');

const PaymentModel = require('../models/payment.model');
const {
    NotFoundException,
    CreateFailedException,
    UpdateFailedException,
    UnexpectedException
} = require('../utils/exceptions/database.exception');

class PaymentController {
    getAllPayments = async (_req, res, _next) => {
        let payments = await PaymentModel.findAll();
        if (!payments.length) {
            throw new NotFoundException('Payments not found');
        }

        const response = structureResponse(payments, 1, "Success");
        res.send(response);
    };

    getPaymentById = async (req, res, _next) => {
        let payment = await PaymentModel.findOne({payment_id: req.params.id});
        if (!payment) {
            throw new NotFoundException('Payment not found');
        }

        const response = structureResponse(payment, 1, "Success");
        res.send(response);
    };

    getUserPayments = async (req, res, _next) => {
        let payments = await PaymentModel.findAllByUser(req.params.id, req.query);
        if (!payments.length) {
            throw new NotFoundException('Payments for this user not found');
        }

        payments = payments.map((payment, _i, _payments) => {
            const {title, poster_url, ...paymentDetails} = payment;
            payment = paymentDetails;
            payment.movie = {title, poster_url};
            return payment;
        });

        const response = structureResponse(payments, 1, "Success");
        res.send(response);
    };

    createPayment = async (req, res, _next) => {
        checkValidation(req);

        const result = await PaymentModel.create(req.body);

        if (!result) {
            throw new CreateFailedException('Payment failed to be created');
        }

        const response = structureResponse(result, 1, 'Payment was created!');
        res.status(201).send(response);
    };

    updatePayment = async (req, res, _next) => {
        checkValidation(req);

        const result = await PaymentModel.update(req.body, req.params.id);

        if (!result) {
            throw new UnexpectedException('Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        if (!affectedRows) throw new NotFoundException('Payment not found');
        else if (affectedRows && !changedRows) throw new UpdateFailedException('Payment update failed');
        
        const response = structureResponse(info, 1, 'Payment updated successfully');
        res.send(response);
    };

    deletePayment = async (req, res, _next) => {
        const result = await PaymentModel.delete(req.params.id);
        
        if (!result) {
            throw new NotFoundException('Payment not found');
        }

        const response = structureResponse({}, 1, 'Payment has been deleted');
        res.send(response);
    };
}

module.exports = new PaymentController;