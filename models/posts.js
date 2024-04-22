const knex = require("knex");
const dotenv = require("dotenv");
const sharp = require("sharp");
const fs = require("fs");


dotenv.config();

const db = knex({
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
});

const Post = {
  // get all posts with corresponding users
  getPosts: async () => {
    return await db.select('posts.*', 'users.user_id', 'users.username')
                  .from('posts')
                  .innerJoin('users', 'posts.author_id', 'users.user_id')
                  .orderBy('post_date', 'desc');
  },  
  // get posts by course 
  getPostsByCourse: async (course) => {
    return await db.select("*").from("posts").where("course", course);
  },
  // get posts from one user
  getProfilePosts: async (user_id) => {
    return await db.select("*").from("posts").where("author_id", user_id);
  },
  // get single post
  getPost: async (post_id) => {
    return await db.select("*").from("posts").where("post_id", post_id).first();
  },
  // create posts 
  createPost: async (fieldsToUpdate) => {
    // first define accepted file endings for img
    console.log(fieldsToUpdate);
    const acceptedMimeTypes = [
      "image/gif",
      "image/jpeg",
      "image/png",
      "image/svg+xml",
    ];
    let post_date = new Date();
    let collaboration_id = 1; // for now is set, will be implemented later
    // assign input fields
    //console.log(fieldsToUpdate.newfilename);
    let postData = {
      author_id: fieldsToUpdate.user_id,
      post_date: post_date,
      caption: fieldsToUpdate.caption,
      photo: fieldsToUpdate.chooseImage,
      course: fieldsToUpdate.module,
      collaboration_id: collaboration_id,
      path: fieldsToUpdate.newfilename,
      code_text: 'none'
    };
    uploadedPhoto = fieldsToUpdate.uploadedPhoto;
    // check img, resize, and move
    const path = require('path');

    if (acceptedMimeTypes.indexOf(uploadedPhoto.mimetype) >= 0) {
      const imageDestinationPath = path.join(__dirname, '..', 'public', 'uploads', uploadedPhoto.name);
      await uploadedPhoto.mv(imageDestinationPath);

      const resizedImagePath =
        path.join(__dirname, '..', 'public', 'uploads', 'resized', uploadedPhoto.name);
      await sharp(imageDestinationPath).resize(750).toFile(resizedImagePath);
       
        }
        try {
          // Insert into db
          const result = await db.insert(postData).into("posts");
          return result;
        } catch (error) {
          console.error("Error inserting post:", error);
          throw error; // Throw any errors that occur during insertion
        }
      },
        createTextPost: async (fieldsToUpdate) => {
          console.log(fieldsToUpdate);
          let post_date = new Date();
          let collaboration_id = 1; // for now is set, will be implemented later
          // assign input fields
          let postData = {
            author_id: fieldsToUpdate.user_id,
            post_date: post_date,
            caption: fieldsToUpdate.caption,
            photo: fieldsToUpdate.chooseImage,
            course: fieldsToUpdate.module,
            collaboration_id: collaboration_id,
            code_text: fieldsToUpdate.code_text,
            path: 'none',
          };
          try {
            // Insert into db
            const result = await db.insert(postData).into("posts");
            return result;
          } catch (error) {
            console.error("Error inserting text post:", error);
            throw error; // Throw any errors that occur during insertion
          }
        }
};

    module.exports = { Post };
