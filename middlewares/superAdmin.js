const jwt = require('jsonwebtoken');

// Vérifier si tu est superAdmin
exports.isSuperAdmin = (req, res, next) => {
    const token = req.query.token ? req.query.token : req.headers.authorization;
    if (token && process.env.API_KEY) {
        jwt.verify(token, process.env.API_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: 'Invalid token'
                });
            } else {
                if (decoded.is_super_admin == 1) {
                    next();
                } else {
                    return res.status(401).json({
                        message: 'Vous n\'êtes pas superAdmin.'
                    });
                }
            }
        });
    } else {
        return res.status(401).json({
            message: 'Invalid token'
        });
    }
}
