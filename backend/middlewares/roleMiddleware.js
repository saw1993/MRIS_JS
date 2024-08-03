const logger = require("../config/logger");

const autdhorizeRole = (roles) => {
    return (req, res, next) => {
        // Check if the user role is authorized
        if (roles.includes(req.user.role_name)) {
            next();
        } else {
            res.sendStatus(403); // Forbidden
        }
    };
};

const authorizeRole = (roles) => {
    return (req, res, next) => {
      next()
    };
};

module.exports = authorizeRole;