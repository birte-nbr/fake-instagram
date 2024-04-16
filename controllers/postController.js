const express = require('express');
const {Post} = require('../models/posts'); // importing post model
const {User} = require('../models/users'); // importing user model
const path = require("path"); //required to use 'path' module that gets the current directory
const { profile } = require('console');

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
            const profilePosts = await Post.getProfilePosts(user_id); // Fetch posts by user
            let codeLines = []; // Initialize codeLines array
          
            // Check if profilePosts exists and if code_text is empty
            profilePosts.forEach(element => {
                codeColumn = element.code_text; 
                if (codeColumn !== "none"){
                    console.log(codeColumn);
                    codeLines = codeColumn.split('\n'); // Split code_text into lines
                }
            }); 
           
          
            res.render("user_profile", {
                user, // Pass user data to template
                profilePosts, // Pass posts data to template
                codeLines,
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
            const module = req.body.module;
            const chooseImage = req.body.chooseImage === 'true';  // determines if input is for a photo or code
            if (chooseImage == "true"){
                 const uploadedPhoto = req.files.image;
                 // generate a file name
                 const randomNumber = Math.floor(Math.random() * 9000) + 1000;
                 let newfilename = randomNumber + uploadedPhoto.name;
                 const uploadPath = path.join(__dirname, 'assets/uploads', newfilename);
                // move the upload to upload folder
                /* uploadedPhoto.mv(uploadPath, (err) => {
                    if (err) { //debug error if occurs
                        return res.status(500).send(err);
                    }
                 });*/
                 await Post.createPost({chooseImage, user_id, newfilename, caption, module });
                 
            } else {
                const code_text = req.body.code;
                await Post.createPost({chooseImage, user_id, code_text, caption, module });
            } 
            res.redirect(`users/${user_id}`); // upload was successful, redirect to user profile   
        } catch(error){
            console.error("Error creating post:", error);
            //res.status(500).send("Error creating post");
        }
    }
  
}


module.exports = PostController;