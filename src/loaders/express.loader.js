const express = require("express");
const cors = require("cors");

class ExpressLoader {
    static init () {
        const app = express();

        // Middleware that transforms the raw string of req.body into json
        app.use(express.json());

        // parses incoming requests with JSON payloads
        app.use(cors());
        app.options("*", cors());

        return app;
    }
}

module.exports = { ExpressLoader };