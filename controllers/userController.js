const express = require('express');
const {User} = require('../models/users'); // importing all user routes


const UserController = {
    getAllUsers: async(req, res) =>{
        const users = await User.getUsers();
        res.render("user_overview", {
                users, 
        
        });
    }
}
module.exports = UserController;