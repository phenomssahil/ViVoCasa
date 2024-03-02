const { response } = require('express');
const User = require('../model/user');

async function getAllUsers(req,res){
    try{
        const user = await User.find();
        
        if(!user){
            return res.json({message: 'No user found'});
        }
        return res.json(user);
    }
    catch(err){
        console.log(err);
        return res.json({message: err.message});
    }
}
async function createUser(req,res){
    try{
        const user = req.body.user;
        
        await User.create(user);
        return res.json({message:"user created successfully"});
    }
    catch(err){
        if(err.code == 11000){
            return res.json({message:"User already exists"});
        }
        return res.json({message:err.message})
    }

}
async function deleteUser(req,res){
    try {
        const email = req.body.user.email;
        const userExists = await User.findOne({email}); 
        if(!userExists){
            return res.json({message:"User not found"});
        }
        await User.deleteOne({email});
        return res.json({message:"User deleted successfully"});

    } catch (err) {
        res.json({message:err.message})
    }
}
async function getUserProfile(req, res) {
    try {
        const email = req.body.user.email;

        const user = await User.findOne({email});

        if(!user) {
            return res.json({message:"User not found"});
        }  
        const userProfile = {
            username: user.name,
            email: user.email,
            address: user.address
        }
        return res.json(userProfile);

    } catch (err) {
        res.json({message:err.message})
    }
}
async function updateUserProfile(req, res) {
    try{
        const email = req.body.user.email;
        const user = req.body.user;
        
        await User.updateOne({email:email}, {$set:user})
        return res.json({message:"user updated successfully"});
    }
    catch (err) {
        return res.json({message:err.message});
    }
}
module.exports = {
    getAllUsers,
    createUser,
    deleteUser,
    getUserProfile,
    updateUserProfile
}