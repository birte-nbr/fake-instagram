const express = require('express');
const {Post} = require('../models/posts'); // importing post model
const {User} = require('../models/users'); // importing user model

/* old post controller only passing posts 
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
} */


// new post controller passing post and user
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
            const user = await User.getUser(user_id); // Fetch user data
            const profilePosts = await Post.getPost(user_id); // Fetch posts by user
            res.render("user_profile", {
                user, // Pass user data to template
                profilePosts, // Pass posts data to template
            });
        } catch (error) {
            console.error("Error fetching user profile:", error);
            res.status(500).send("Error fetching user profile");
        }
    }, 
    uploadPage: async (req, res) => {
        try {
            let chooseImage = true; // Set initial value
            res.render("upload-image", { chooseImage }); // Send chooseImage to the template
        } catch (error) {
            console.error('Error rendering upload page:', error);
            res.status(500).send('Error rendering upload page');
        }
    }, 
    uploadPost: async (req, res) => {
        try {
            const user_id = req.body.author;  // for now, user has to put their id number
            const caption = req.body.caption;
            const chooseImage = req.body.chooseImage === 'true';  // determines if input is for a photo or code
            if (chooseImage){
                 const alt_text = req.body.alt_text;
                 const path = req.file.path;
                 const uploadedPhoto = req.files.image;
                 await Post.createPost({user_id, description, alt_text, path, uploadedPhoto, caption });
            } else {
                const code_text = req.body.code;
                await Post.createPost({user_id, description, code_text, caption });
            }      
            res.redirect(`/users/${user_id}`); // upload was successful, redirect to user profile
        } catch(error){
            onsole.error("Error creating post:", error);
            res.status(500).send("Error creating post");
        }
    }
  
}


module.exports = PostController;