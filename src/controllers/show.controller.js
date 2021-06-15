const ShowModel = require('../models/show.model');
const {checkValidation} = require('../middleware/validation.middleware');
const {
    NotFoundException,
    CreateFailedException,
    UpdateFailedException,
    UnexpectedException
} = require('../utils/exceptions/database.exception');
const { structureResponse, parseTime } = require('../utils/common.utils');

class ShowController {

    getAllShows = async (req, res, next) => {
        let showList = await ShowModel.findAll();
        if (!showList.length) {
            throw new NotFoundException('Shows not found');
        }

        let showDatesList = {};

        for (const show of showList) {
            const { date, movie_id, ...showDetails } = show;
            if (!showDatesList[date]) {
                showDatesList[date] = {date, movie_id};
                showDatesList[date].show_times = [];
            }
            showDetails.start_time = `${date} ${parseTime(showDetails.start_time)}`;
            showDetails.end_time = `${date} ${parseTime(showDetails.end_time)}`;
            showDatesList[date].show_times.push(showDetails);
        }

        showDatesList = Object.values(showDatesList);

        const response = structureResponse(showDatesList, 1, "Success");
        res.send(response);
    };

    getShowById = async (req, res, next) => {
        const result = await ShowModel.findOne({ show_id: req.params.id });
        if (!result) {
            throw new NotFoundException('Show not found');
        }

        const response = structureResponse(result, 1, "Success");
        res.send(response);
    };

    getFilteredShows = async (req, res, next) => {
        checkValidation(req);

        let showList = await ShowModel.findAll(req.query);
        if (!showList.length) {
            throw new NotFoundException('Shows for this movie not found');
        }
        
        let showDatesList = {};

        for (const show of showList) {
            const { date, movie_id, ...showDetails } = show;
            if (!showDatesList[date]) {
                showDatesList[date] = {date, movie_id};
                showDatesList[date].show_times = [];
            }
            showDetails.start_time = `${date} ${this.parseTime(showDetails.start_time)}`;
            showDetails.end_time = `${date} ${this.parseTime(showDetails.end_time)}`;
            showDatesList[date].show_times.push(showDetails);
        }

        showDatesList = Object.values(showDatesList);

        const response = structureResponse(showDatesList, 1, "Success");
        res.send(response);
    };

    createShow = async (req, res, next) => {
        checkValidation(req);
        
        const conflicts = await ShowModel.findTimeConflicts(req.body);

        if (conflicts !== 0) {
            throw new CreateFailedException('Show time conflicts found');
        }

        const result = await ShowModel.create(req.body);

        if (!result) {
            throw new CreateFailedException('Show failed to be created');
        }

        const response = structureResponse(result, 1, 'Show was created!');
        res.status(201).send(response);
    };

    updateShow = async (req, res, next) => {
        checkValidation(req);

        if (req.body.start_time !== undefined) {
            const conflicts = await ShowModel.findTimeConflicts(req.body);

            if (conflicts !== 0) {
                throw new UpdateFailedException('Show time conflicts found');
            }
        }

        const result = await ShowModel.update(req.body, req.params.id);

        if (!result) {
            throw new UnexpectedException();
        }

        const { affectedRows, changedRows, info } = result;

        if (!affectedRows) throw new NotFoundException('Show not found');
        else if (affectedRows && !changedRows) throw new UpdateFailedException('Show update failed');
            
        const response = structureResponse(info, 1, 'Show updated successfully');

        res.send(response);
    };

    deleteShow = async (req, res, next) => {
        const result = await ShowModel.delete(req.params.id);
        if (!result) {
            throw new NotFoundException('Show not found');
        }

        const response = structureResponse({}, 1, 'Show has been deleted');
        res.send(response);
    };
}

module.exports = new ShowController;