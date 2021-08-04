const { checkValidation } = require('../middleware/validation.middleware');

const PaymentRepository = require('../repositories/payment.repository');

class PaymentController {
    getAllPayments = async (_req, res, _next) => {
        const response = await PaymentRepository.findAll();
        res.send(response);
    };

    getPaymentById = async (req, res, _next) => {
        const response = await PaymentRepository.findOne({payment_id: req.params.id});
        res.send(response);
    };

    getUserPayments = async (req, res, _next) => {
        const response = await PaymentRepository.findAllByUser(req.params.id, req.query);
        res.send(response);
    };

    createPayment = async (req, res, _next) => {
        checkValidation(req);
        const response = await PaymentRepository.create(req.body);
        res.status(201).send(response);
    };

    updatePayment = async (req, res, _next) => {
        checkValidation(req);
        const response = await PaymentRepository.update(req.body, req.params.id);
        res.send(response);
    };

    deletePayment = async (req, res, _next) => {
        const response = await PaymentRepository.delete(req.params.id);
        res.send(response);
    };
}

module.exports = new PaymentController;