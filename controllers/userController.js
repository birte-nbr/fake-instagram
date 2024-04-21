const express = require('express');
const {User} = require('../models/users'); // importing all user routes


const UserController = {
    getAllUsers: async(req, res) =>{
        const users = await User.getUsers();
        res.render("user_overview", {
                users, 
        
        });
    }, 
    register: async (req, res) =>{
        try {
          const username = req.body.username;
          const given_name = req.body.given_name;
          const surname = req.body.surname;                    
          const country = req.body.country;
          const birthday = req.body.birthday;
          const course = req.body.course;
          const profile_pic = req.body.profilePic;
          const background_pic = req.body.background_pic;
          // add the id for the picture (1 or 2) 
          // generate the user id
          const user_id = Math.floor((Math.random()*9000)+1000);
          await User.createUser({ username, given_name, surname, country, birthday, course }); 
          res.redirect(`/users/${user_id}`);
        } catch (error) {
          console.error("Error creating user", error);
          //res.status(500).send("Error creating user");
        }
      }
}
module.exports = UserController;