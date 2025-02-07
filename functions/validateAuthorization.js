const verifyToken = require('./verifyToken');

const validateAuthorization = (req, res, next) => {
    const { authorization } = req.headers
    let statusCode = 401;
    let message = {
        'error': 'Token is invalid or malformed.'
    }

    if (authorization) {
        if (authorization.startsWith('Bearer')) {
            if (verifyToken(authorization.replace('Bearer ', ''))) {
                return next();
            }
        }
    }

    return res.status(statusCode).json(message);
}

module.exports = validateAuthorization