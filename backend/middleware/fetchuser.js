var jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        console.log(data.user)
        req.user = data.user;
        console.log('middleware working');
        next();
    } catch (error) {
        res.status(401).send({ success: false, error: "Please authenticate using a valid token" })
    }

}

module.exports = fetchuser;