class Auth {

    constructor() {
        this.validateAuthorization = this.validateAuthorization.bind(this);
        this.verifyToken = this.verifyToken.bind(this);
    }

    validateAuthorization(req, res, next) {
        const { authorization } = req.headers
        let statusCode = 401;
        let message = {
            'error': 'Token is invalid or malformed.'
        }

        if (authorization) {
            if (authorization.startsWith('Bearer')) {
                if (this.verifyToken(authorization.replace('Bearer ', ''))) {
                    return next();
                }
            }
        }

        return res.status(statusCode).json(message);
    }

    verifyToken(tokenWithoutBearer) {
        console.log(tokenWithoutBearer)
        const SECRET = process.env.SECRET;
        return tokenWithoutBearer === SECRET;
    }
}

module.exports = Auth;