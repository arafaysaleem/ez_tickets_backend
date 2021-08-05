const {
    TokenMissingException,
    TokenVerificationException,
    UnauthorizedException
} = require('../utils/exceptions/auth.exception');
const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { Config } = require('../configs/config');

const auth = (...roles) => {
    return async function (req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            const bearer = 'Bearer ';

            if (!authHeader || !authHeader.startsWith(bearer)) {
                throw new TokenMissingException();
            }

            const token = authHeader.replace(bearer, '');
            const secretKey = Config.SECRET_JWT;

            // Verify Token
            const decoded = jwt.verify(token, secretKey);
            const user = await UserModel.findOne({ user_id: decoded.user_id });

            if (!user) {
                throw new TokenVerificationException();
            }

            // check if the current user is the owner user
            // const ownerAuthorized = req.params.id == user.user_id; //cant update self
            // if the current user is not the owner and
            // if the user role don't have the permission to do this action.
            // the user will get this error
            if (/*! ownerAuthorized || */(roles.length && !roles.includes(user.role))) {
                throw new UnauthorizedException();
            }

            // if the user has permissions
            req.currentUser = user;
            next();

        } catch (e) {
            e.status = 401;
            next(e);
        }
    };
};

module.exports = auth;