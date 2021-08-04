const { structureResponse } = require('../utils/common.utils');
const { DBService } = require('../db/db-service');

const BookingModel = require('../models/booking.model');
const PaymentModel = require('../models/payment.model');
const {
    NotFoundException,
    CreateFailedException,
    UpdateFailedException,
    UnexpectedException
} = require('../utils/exceptions/database.exception');

class PaymentRepository {
    findAll = async (params = {}) => {
        const hasParams = Object.keys(params).length !== 0;
        let payments = await PaymentModel.findAll(hasParams ? params : {});
        if (!payments.length) {
            throw new NotFoundException('Payments not found');
        }

        return structureResponse(payments, 1, "Success");
    };

    findOne = async (params) => {
        let payment = await PaymentModel.findOne(params);
        if (!payment) {
            throw new NotFoundException('Payment not found');
        }

        return structureResponse(payment, 1, "Success");
    };

    findAllByUser = async (id, query = {}) => {
        let payments = await PaymentModel.findAllByUser(id, query);
        if (!payments.length) {
            throw new NotFoundException('Payments for this user not found');
        }

        payments = payments.map((payment, _i, _payments) => {
            const {title, poster_url, ...paymentDetails} = payment;
            payment = paymentDetails;
            payment.movie = {title, poster_url};
            return payment;
        });

        return structureResponse(payments, 1, "Success");
    };

    create = async (body) => {
        const { bookings, ...reqBody } = body;

        await DBService.beginTransaction();
        
        const result = await PaymentModel.create(reqBody);

        if (!result) {
            await DBService.rollback();
            throw new CreateFailedException('Payment failed to be created');
        }

        for (const booking_id of bookings) {
            const success = await BookingModel.update({ booking_status: "confirmed" }, booking_id);
            
            if (!success) {
                await DBService.rollback();
                throw new UpdateFailedException('One of the bookings failed to be confirmed');
            }

            const { affectedRows, changedRows} = success;

            if (!affectedRows) {
                await DBService.rollback();
                throw new NotFoundException(`Booking ID: ${booking_id} not found`);
            } else if (affectedRows && !changedRows) {
                await DBService.rollback();
                throw new UpdateFailedException('One of the bookings failed to be confirmed');
            }
        }

        await DBService.commit();

        return structureResponse(result, 1, 'Payment was created! Booking confirmed!');
    };

    update = async (body, id) => {
        const result = await PaymentModel.update(body, id);

        if (!result) {
            throw new UnexpectedException('Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        if (!affectedRows) throw new NotFoundException('Payment not found');
        else if (affectedRows && !changedRows) throw new UpdateFailedException('Payment update failed');
        
        return structureResponse(info, 1, 'Payment updated successfully');
    };

    delete = async (id) => {
        const result = await PaymentModel.delete(id);
        
        if (!result) {
            throw new NotFoundException('Payment not found');
        }

        return structureResponse({}, 1, 'Payment has been deleted');
    };
}

module.exports = new PaymentRepository;