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
          const email_address = req.body.email;
          const given_name = req.body.given_name;
          const surname = req.body.surname;                    
          const country = req.body.country;
          const date_of_birth = req.body.birthday;
          const fav_course = req.body.course;
          const profile_pic = req.body.profilePic;
          const background_pic = req.body.backgroundPic;
          // add the id for the picture (1 or 2) 
          // generate the user id
          const user_id = Math.floor((Math.random()*9000)+1000);
          const newUser = await User.createUser({ user_id, username, email_address, given_name, surname, country, date_of_birth, fav_course, profile_pic, background_pic }); 
          //console.log(newUser);
          res.redirect(`/users/${user_id}`);
        } catch (error) {
          console.error("Error creating user", error);
          //res.status(500).send("Error creating user");
        }
      }
}
module.exports = UserController;