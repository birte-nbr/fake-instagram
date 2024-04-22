const express = require('express');
const { Post } = require('../models/posts'); // importing post model
const { User } = require('../models/users'); // importing user model
const path = require("path"); //required to use 'path' module that gets the current directory
//const { profile } = require('console');

// new post controller passing post and user
const PostController = {
    getFeed: async (req, res) => {
        try {
            const posts = await Post.getPosts();
            //console.log(posts); // Log the posts variable to the console
            res.render("feed", {
                posts,
            });
        } catch (error) {
            console.error("Error fetching posts:", error);
            res.status(500).send("Error fetching posts");
        }
    },
    getUserFeed: async (req, res) => {
        try {
            const user_id = req.params.id;
            const user = await User.getUser(user_id); // Fetch user data
            const profilePosts = await Post.getProfilePosts(user_id); // Fetch posts by user
           
            res.render("profile", {
                user, // Pass user data to template
                profilePosts, // Pass posts data to template
            });
        } catch (error) {
            console.error("Error fetching user profile:", error);
            res.status(500).send("Error fetching user profile");
            res.redirect('404');
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
            const module = req.body.module;
            const chooseImage = req.body.chooseImage ? 1 : 0;                    
            const uploadedPhoto = req.files.image;
            // generate a file name
            //const randomNumber = Math.floor(Math.random() * 9000) + 1000;
            let newfilename = uploadedPhoto.name;
            //const uploadPath = path.join(__dirname, 'assets/uploads', newfilename);
            //console.log(newfilename);
            await Post.createPost({ chooseImage, uploadedPhoto, user_id, newfilename, caption, module });          
            res.redirect(`users/${user_id}`); // upload was successful, redirect to user profile   
        } catch (error) {
            console.error("Error creating img post:", error);
            //res.status(500).send("Error creating post");
        }
    }, 
    uploadText: async (req, res) => {
        try {
            const user_id = req.body.author;  // for now, user has to put their id number
            const caption = req.body.caption;
            const module = req.body.module;
            const code_text = req.body.code;
            const chooseImage = req.body.chooseImage ? 1 : 0;  
            
            await Post.createTextPost({chooseImage, user_id, code_text, caption, module });
            res.redirect(`users/${user_id}`);
        } catch (error) {
            console.error("Error creating text post:", error);
        }
    },
    getCoursePosts: async (req, res) => {
        try {
            const course  = req.query.course;
            console.log(course);
            //const postsByCourse = await Post.getPostsByCourse({ course }); // wait for model output 
            //res.render("feed", { postsByCourse });
        } catch (error) {
            console.error("Error fetching course data:", error);
        }
    }

}


module.exports = PostController;