const User = require('../model/user');
const jwt = require('jsonwebtoken');

async function checkAuth(req, res, next) {
        const token = req.cookie.token;
        if(token){
            const verifiedToken = jwt.verify(token,'secret');
            const email = verifiedToken.email;
            const user = await User.findOne(email);
            req.user = user;
        }
        next();
}

module.exports = {checkAuth};