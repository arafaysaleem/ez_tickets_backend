const { checkValidation } = require('../middleware/validation.middleware');

const TheaterRepository = require('../repositories/theater.repository');

class TheaterController {
    getAllTheaters = async (req, res, next) => {
        const response = await TheaterRepository.findAll();
        res.send(response);
    };

    getTheaterById = async (req, res, next) => {
        const response = await TheaterRepository.findOne({ theater_id: req.params.id });
        res.send(response);
    };

    createTheater = async (req, res, next) => {
        checkValidation(req);
        const response = await TheaterRepository.create(req.body);
        res.status(201).send(response);
    };

    updateTheater = async (req, res, next) => {
        checkValidation(req);
        const response = await TheaterRepository.update(req.body, req.params.id);
        res.send(response);
    };

    deleteTheater = async (req, res, next) => {
        const response = await TheaterRepository.delete(req.params.id);
        res.send(response);
    };
}

module.exports = new TheaterController;