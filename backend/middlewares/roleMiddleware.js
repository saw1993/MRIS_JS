const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (roles.includes(req.user.role_name)) {
            next();
        } else {
            res.sendStatus(403); // Forbidden
        
        }
    };
};

module.exports = authorizeRole;