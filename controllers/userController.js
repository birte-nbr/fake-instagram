const express = require('express');
const {User} = require('../models/users'); // importing all user routes


const UserController = {
    getAllUsers: async(req, res) =>{
        const users = await User.getUsers();
        res.render("user_overview", {
                users, 
        
        });
    },

    getUserProfile: async(req, res) => {
        const user_id = req.params.id; 
        const user = await User.getUser(user_id)
        res.render("user_profile", {
             user,
        });
    }
}
module.exports = UserController;