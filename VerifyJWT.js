
const jwt = require('jsonwebtoken')
require('dotenv').config()

function verifyJWT(req, res, next) {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).send({ message: 'UnAuthorized access' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(403).send({ message: 'Forbidden access' })
        }
        else if (req.headers.email === user.email) {
            next()
        }
        else {
            return res.status(500).send({ message: "I Don't have permission To giveing you This Data please contact on our help center" })
        }
    });
}

module.exports = verifyJWT