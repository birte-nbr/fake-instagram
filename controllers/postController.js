const express = require('express');
const {Post} = require('../models/posts'); // importing all posts routes



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
        const user_id = req.params.id; 
        const post = await Post.getPost(user_id)
        res.render("user_profile", {
             post,
        });
    }
}
module.exports = PostController;