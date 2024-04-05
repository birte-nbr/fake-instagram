const express = require('express');
const {Post} = require('../models/posts'); // importing all posts routes



const PostController = {
    getFeed: async(req, res) =>{
        const posts = await Post.getPosts();
        res.render("photo-overview", {
                posts, 
        
        });
    },

    getSinglePost: async(req, res) => {
        const user_id = req.params.id; 
        const post = await Post.getPost(user_id)
        res.render("user_details", {
             post,
        });
    }
}
module.exports = PostController;