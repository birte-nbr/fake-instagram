const express = require('express');
const {Post} = require('../models/posts'); // importing post model
const {User} = require('../models/users'); // importing user model


const PostController = {
    getFeed: async(req, res) =>{
        try {
            const posts = await Post.getPosts();
            console.log(posts); // Log the posts variable to the console
            res.render("photo-overview", {
                posts, 
            });
        } catch (error) {
            console.error("Error fetching posts:", error);
            res.status(500).send("Error fetching posts");
        }
    },
    getUserFeed: async(req, res) => {
        try {
            const user_id = req.params.id; 
            const posts = await Post.getPost(user_id); // Fetch posts by user
            res.render("user_profile", {
                posts, // Pass posts data to template
            });
        } catch (error) {
            console.error("Error fetching user profile:", error);
            res.status(500).send("Error fetching user profile");
        }
    }
}

module.exports = PostController;