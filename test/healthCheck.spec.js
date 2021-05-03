/* eslint-disable no-undef */
const request = require("supertest");
const app = require('../src/server');

describe("Healthcheck", () => {
    it("returns OK, success and up, if server is healthy", (done) => {
        request(app).get("/api/v1/health", null)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function (res) {
                const success = res.body.headers.success;
                const uptime = res.body.body.uptime;
                const health = res.body.body.health;
                res.body = {};
                res.body.success = success;
                res.body.up = uptime > 0;
                res.body.health = health;
            })
            .expect(200, {
                health: 'OK',
                success: 1,
                up: true
            })
            .end(function (err) {
                if (err) return done(err);
                return done();
            });
    });
});