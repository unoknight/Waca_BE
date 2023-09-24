const rateLimit = require("express-rate-limit");

const requestLimiter = rateLimit({
    windowMs: 5 * 1000, // 6 seconds
    max: 1 // limit each IP to 2 requests per windowMs
});

module.exports = requestLimiter