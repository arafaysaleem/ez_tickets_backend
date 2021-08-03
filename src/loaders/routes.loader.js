/* Routes */
const authRouter = require('../routes/auth.routes');
const userRouter = require('../routes/user.routes');
const movieRouter = require('../routes/movie.routes');
const roleRouter = require('../routes/role.routes');
const theaterRouter = require('../routes/theater.routes');
const showRouter = require('../routes/show.routes');
const bookingRouter = require('../routes/booking.routes');
const paymentRouter = require('../routes/payment.routes');
const genreRouter = require('../routes/genre.routes');
const healthCheckRouter = require('../routes/healthCheck.routes');

class RoutesLoader {
    static initRoutes (app, version) {
        app.use(`/api/${version}/auth`, authRouter);
        app.use(`/api/${version}/users`, userRouter);
        app.use(`/api/${version}/movies`, movieRouter);
        app.use(`/api/${version}/roles`, roleRouter);
        app.use(`/api/${version}/theaters`, theaterRouter);
        app.use(`/api/${version}/shows`, showRouter);
        app.use(`/api/${version}/bookings`, bookingRouter);
        app.use(`/api/${version}/payments`, paymentRouter);
        app.use(`/api/${version}/genres`, genreRouter);
        app.use(`/api/${version}/health`, healthCheckRouter);
    }
}

module.exports = {RoutesLoader};