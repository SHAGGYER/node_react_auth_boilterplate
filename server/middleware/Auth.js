const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const {userId} = jwt.verify(token, 'app');
        if (!userId) {
            next();
        } else {
            req.userId = userId;
            next();
        }
    } catch (e) {
        next();
    }
};