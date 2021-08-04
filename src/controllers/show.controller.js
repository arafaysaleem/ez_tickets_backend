const {checkValidation} = require('../middleware/validation.middleware');

const ShowRepository = require('../repositories/show.repository');

class ShowController {

    getAllShows = async (req, res, next) => {
        const response = await ShowRepository.findAll();
        res.send(response);
    };

    getShowById = async (req, res, next) => {
        const response = await ShowRepository.findOne({ show_id: req.params.id });
        res.send(response);
    };

    getFilteredShows = async (req, res, next) => {
        checkValidation(req);
        const response = await ShowRepository.findAll(req.query);
        res.send(response);
    };

    createShow = async (req, res, next) => {
        checkValidation(req);
        const response = await ShowRepository.create(req.body);
        res.status(201).send(response);
    };

    updateShow = async (req, res, next) => {
        checkValidation(req);
        const response = await ShowRepository.update(req.body, req.params.id);
        res.send(response);
    };

    deleteShow = async (req, res, next) => {
        const response = await ShowRepository.delete(req.params.id);
        res.send(response);
    };
}

module.exports = new ShowController;