const MovieRoleModel = require('../models/movieRole.model');
const {checkValidation} = require('../middleware/validation.middleware');
const {
    NotFoundException,
    UpdateFailedException,
    UnexpectedException
} = require('../utils/exceptions/database.exception');
const { structureResponse } = require('../utils/common.utils');

class MovieRoleController {

    // getAllMovieRoles = async (req, res, next) => {
    //     let movieRoleList = await MovieRoleModel.findAll();
    //     if (!movieRoleList.length) {
    //         throw new NotFoundException('Movie Roles not found');
    //     }

    //     const response = structureResponse(movieRoleList, 1, "Success");
    //     res.send(response);
    // };

    updateMovieRole = async (req, res, next) => {
        checkValidation(req);

        // todo: fix API
        const result = await MovieRoleModel.update(req.body, req.params.id);

        if (!result) {
            throw new UnexpectedException('Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        if (!affectedRows) throw new NotFoundException('Movie Role not found');
        else if (affectedRows && !changedRows) throw new UpdateFailedException('Movie Role update failed');
            
        const response = structureResponse(info, 1, 'Movie Role updated successfully');

        res.send(response);
    };

    deleteMovieRole = async (req, res, next) => {
        const result = await MovieRoleModel.delete(req.params.id);
        if (!result) {
            throw new NotFoundException('Movie Role not found');
        }

        const response = structureResponse({}, 1, 'Movie Role has been deleted');
        res.send(response);
    };
}

module.exports = new MovieRoleController;