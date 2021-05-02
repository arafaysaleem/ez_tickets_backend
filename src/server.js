const express = require("express");
const cors = require("cors");
const {InvalidEndpointException} = require('./utils/exceptions/api.exception');
const errorMiddleware = require('./middleware/error.middleware');

/* Routes */
const authRouter = require('./routes/auth.routes');
const userRouter = require('./routes/user.routes');
const movieRouter = require('./routes/movie.routes');
const roleRouter = require('./routes/role.routes');
const theaterRouter = require('./routes/theater.routes');
const showRouter = require('./routes/show.routes');
const bookingRouter = require('./routes/booking.routes');
const paymentRouter = require('./routes/payment.routes');
const genreRouter = require('./routes/genre.routes');

const app = express();
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
app.use(cors());
app.options("*", cors());

const port = Number(process.env.PORT || 3331);

app.use(`/api/v1/auth`, authRouter);
app.use(`/api/v1/users`, userRouter);
app.use(`/api/v1/movies`, movieRouter);
app.use(`/api/v1/roles`, roleRouter);
app.use(`/api/v1/theaters`, theaterRouter);
app.use(`/api/v1/shows`, showRouter);
app.use(`/api/v1/bookings`, bookingRouter);
app.use(`/api/v1/payments`, paymentRouter);
app.use(`/api/v1/genres`, genreRouter);

// 404 error
app.all('*', (req, res, next) => {
    const err = new InvalidEndpointException();
    next(err);
});

// Error middleware
app.use(errorMiddleware);

// starting the server
app.listen(port, () => console.log(`🚀 Server running on port ${port}!`));

module.exports = app;