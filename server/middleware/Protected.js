module.exports = (req, res, next) => {
    try {
        if (!req.userId) {
            res.sendStatus(401);
        } else {
            next();
        }
    } catch (e) {
        res.sendStatus(401);
    }
};