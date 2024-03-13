const { request } = require('express');
const User = require('../model/user')
const jwt = require('jsonwebtoken');

async function handleUserSignup(req,res){
    try {
        const {name,email,password} = req.body;
        
        const userExists = await User.findOne({email:email});
        if(userExists) return res.status(400).redirect('/signup');

        if(req.body.address){
            const address = req.body.address;
            await User.create({
                name,
                email,
                password,
                address
            })
            return res.status(201).redirect('/login');
        }
        await User.create({
            name,
            email,
            password
        })
        return res.status(201).redirect('/login');
    } 
    catch (error) {
        return res.status(500).redirect('/signup');
    }
}
async function handleUserLogin(req,res){
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email: email, password: password});

        if(!user) return res.status(403).redirect('/login');

        request.user = user;

        const token = jwt.sign(
            {email:user.email},
            'secret'
        )
        res.status(201).cookie('token',token).redirect('/');
    } 
    catch (error) {
        res.status(error.status).redirect('/login');
    }    
}
async function handleUserLogout(req, res) {
    try {
        return res.clearCookie('token').redirect('/login');
    } 
    catch (error) {
        res.json({error: error.message});
    }
}

module.exports = {
    handleUserLogin,
    handleUserSignup,
    handleUserLogout
}