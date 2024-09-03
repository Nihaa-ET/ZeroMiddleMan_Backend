const jwt = require('jsonwebtoken');



const verifyToken = (roles = []) => {
    return async (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token == null) return res.sendStatus(401); // Unauthorized

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
            if (err) return res.sendStatus(403); // Forbidden

            // Check if the user's role is allowed
            if (roles.length && !roles.includes(user.role)) {
                return res.status(403).json({ message: 'Forbidden: You do not have access to this resource' });
            }

            // Attach user information to request
            req.user = user;
            next();
        });
    };
};

module.exports = verifyToken;
