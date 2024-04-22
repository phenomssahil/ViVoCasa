const User = require('../model/user');
const jwt = require('jsonwebtoken');

async function checkAuth(req, res, next) {
    const token = req.cookies.token;
    if(token){
        const verifiedToken = jwt.verify(token,'secret');
        const email = verifiedToken.email;
        const user = await User.findOne({email});
        req.user = user;
    }
    next();
}
async function isLoggedIn(req, res, next) {
    if(!req.user) {
        console.log("not logged in");
        return res.status(403).json({message:"not logged in"});
    }
    next();
}
async function isAdmin(req, res, next) {
    if(req.user){

        const role = req.user.role;
        
        if(role === 'admin'){
            next();
        }
        else{
            res.status(403).json({message:"restriced: access denied"});
        }
    }
    else{
        res.status(403).json({message:"not logged in"});
    }

}

module.exports = {checkAuth,isLoggedIn,isAdmin};