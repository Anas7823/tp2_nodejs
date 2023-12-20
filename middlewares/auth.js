const jwt = require('jsonwebtoken');

// Vérifier si tu est bien authentifié
exports.verifAuth = (req, res, next) => {
    const token = req.query.token ? req.query.token : req.headers.authorization;

    if (token && process.env.API_KEY) {
        jwt.verify(token, process.env.API_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: 'Invalid token'
                });
            } else{
                next();
            }
        });
    } else {
        res.status(401).json({
            message: 'Access denied.'
        });
    }
}
