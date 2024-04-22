const express = require('express');
const fs = require("fs");  // for file upload
const PostController = require('../controllers/postController.js'); // importing post controller
const { Post } = require('../models/posts.js');
const posts = express.Router();


// Define a route for the root URL ("/")
/*
posts.get('/', async (req, res) => {
    res.render('main.ejs'); // homepage template here 
});*/


// page that lists all users
posts.get("/feed", PostController.getFeed);
    

// page that displays user details
posts.get("/users/:id", PostController.getUserFeed); 


posts.get("/uploadpage", PostController.uploadPage);

// upload img
posts.post("/uploadimg", PostController.uploadPost);

// upload text
posts.post("/uploadtext", PostController.uploadText);

posts.post("/feed", PostController.getCoursePosts);

module.exports = posts;