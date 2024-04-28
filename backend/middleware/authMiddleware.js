const User = require('../model/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function checkAuth(req, res, next) {
    const token = req.cookies.token;
    console.log(req.cookies);
    if(token){
        const verifiedToken = jwt.verify(token,process.env.JWT_SECRET);
        const email = verifiedToken.email;
        const user = await User.findOne({email});
        req.user = user;
    }
    next();
}
async function isLoggedIn(req, res, next) {
    if(!req.user) {
        return res.status(403).json({message:"unauthorized"});
    }
    next();
}
async function isAdmin(req, res, next) {
    if(req.user.email){
        const user = await User.findOne({email:req.user.email});
        if(!user) return res.status(403).json({message:"user not found"});

        const role = user.role;
        
        if(role === 'admin'){
            next();
        }
        else{
            res.status(403).json({message:"restriced: access denied"});
        }
    }
    else{
        res.status(403).json({message:"unauthorized"});
    }

}

module.exports = {checkAuth,isLoggedIn,isAdmin};