const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const HttpException = require('./utils/HttpException.utils');
const errorMiddleware = require('./middleware/error.middleware');

/* Routes */
const userRouter = require('./routes/user.routes');
const authRouter = require('./routes/auth.routes');

const app = express();
dotenv.config();
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
app.use(cors());
app.options("*", cors());

const port = Number(process.env.PORT || 3331);

app.use(`/api/v1/auth`, authRouter);
app.use(`/api/v1/users`, userRouter);

// 404 error
app.all('*', (req, res, next) => {
    const err = new HttpException(404, 'Endpoint Not Found');
    next(err);
});

// Error middleware
app.use(errorMiddleware);

// starting the server
app.listen(port, () => console.log(`🚀 Server running on port ${port}!`));

module.exports = app;