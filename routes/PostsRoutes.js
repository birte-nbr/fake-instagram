const express = require('express');
const fs = require("fs");  // for file upload
const PostController = require('../controllers/postController.js'); // importing post controller
const posts = express.Router();


// Define a route for the root URL ("/")
posts.get('/', async (req, res) => {
    res.render('main.ejs'); // homepage template here 
});


// page that lists all users
posts.get("/photos", PostController.getFeed);
    

// page that displays user details
posts.get("/users/:id", PostController.getUserFeed); 

// upload page
posts.get("/uploadpage", PostController.uploadPage);



module.exports = posts;