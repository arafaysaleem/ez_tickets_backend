const { structureResponse } = require('../utils/common.utils');
const { HealthCheckFailedException } = require('../utils/exceptions/api.exception');

class HealthCheckController {
    getHealthStatus = async (req, res, next) => {
        const healthCheck = {
            uptime: process.uptime().toFixed(2),
            health: 'OK',
            timestamp: new Date(Date.now()).toJSON()
        };
        
        try {
            try {
                const response = structureResponse(healthCheck, 1, "Success");
                res.send(response);
            } catch (error) {
                healthCheck.health = "ERROR";
                const response = structureResponse(healthCheck, 1, "Success");
                res.status(503).send(response);
            }
        } catch (e) {
            healthCheck.health = "FAILED";
            throw new HealthCheckFailedException({...healthCheck});
        }
    };
}

module.exports = new HealthCheckController;