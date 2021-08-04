const ShowModel = require('../models/show.model');
const {
    NotFoundException,
    CreateFailedException,
    UpdateFailedException,
    UnexpectedException
} = require('../utils/exceptions/database.exception');
const { structureResponse, parseTime } = require('../utils/common.utils');

class ShowRepository {

    findAll = async (params = {}) => {
        const hasParams = Object.keys(params).length !== 0;
        let showList = await ShowModel.findAll(hasParams ? params : {});
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

        return structureResponse(showDatesList, 1, "Success");
    };

    findOne = async (params) => {
        const result = await ShowModel.findOne(params);
        if (!result) {
            throw new NotFoundException('Show not found');
        }

        return structureResponse(result, 1, "Success");
    };

    findAllFiltered = async (query) => {
        let showList = await ShowModel.findAll(query);
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
            showDetails.start_time = `${date} ${parseTime(showDetails.start_time)}`;
            showDetails.end_time = `${date} ${parseTime(showDetails.end_time)}`;
            showDatesList[date].show_times.push(showDetails);
        }

        showDatesList = Object.values(showDatesList);

        return structureResponse(showDatesList, 1, "Success");
    };

    create = async (body) => {
        const conflicts = await ShowModel.findTimeConflicts(body);

        if (conflicts !== 0) {
            throw new CreateFailedException('Show time conflicts found');
        }

        const result = await ShowModel.create(body);

        if (!result) {
            throw new CreateFailedException('Show failed to be created');
        }

        return structureResponse(result, 1, 'Show was created!');
    };

    update = async (body, id) => {
        if (body.start_time !== undefined) {
            const conflicts = await ShowModel.findTimeConflicts(body);

            if (conflicts !== 0) {
                throw new UpdateFailedException('Show time conflicts found');
            }
        }

        const result = await ShowModel.update(body, id);

        if (!result) {
            throw new UnexpectedException();
        }

        const { affectedRows, changedRows, info } = result;

        if (!affectedRows) throw new NotFoundException('Show not found');
        else if (affectedRows && !changedRows) throw new UpdateFailedException('Show update failed');
            
        return structureResponse(info, 1, 'Show updated successfully');
    };

    delete = async (id) => {
        const result = await ShowModel.delete(id);
        if (!result) {
            throw new NotFoundException('Show not found');
        }

        return structureResponse({}, 1, 'Show has been deleted');
    };
}

module.exports = new ShowRepository;