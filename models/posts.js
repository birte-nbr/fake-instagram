const knex = require("knex");
const dotenv = require("dotenv");

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
  // get all posts
    getPosts: async () => {
      return await db.select("*").from("posts");
    },
  // get posts from one user
    getProfilePosts: async (user_id) => {
      return await db.select("*").from("posts").where("author_id", user_id);
    },
    // get single post
    getPost: async(post_id) => {
      return await db.select("*").from("posts").where("post_id", post_id).first();
    },
    // create posts 
    createPost: async (fieldsToUpdate) => {
      let post_date = new Date();
      let collaboration_id = 1; // for now is set, will be implemented later
      
               
      let postData = {
          author_id: fieldsToUpdate.user_id,
          post_date: post_date,
          caption: fieldsToUpdate.caption,
          photo: fieldsToUpdate.chooseImage,
          course: fieldsToUpdate.module,
          collaboration_id: collaboration_id
      };
  
      // If it's an image post, add additional image-related fields
      if (fieldsToUpdate.chooseImage) {
          postData.path = fieldsToUpdate.newfilename;
          postData.code_text = "none";
      } else {
          postData.path = "none"; // Set default value for path if not an image post
          postData.code_text = fieldsToUpdate.code_text;
      }
  
      try {
          // Insert into db
          const result = await db.insert(postData).into("posts");
  
          //const post_id = result[0];
          //return Post.getPost(post_id);
          return result;
      } catch (error) {
          console.error("Error inserting post:", error);
          throw error; // Throw any errors that occur during insertion
      }
      
  }

  
  };
  
  module.exports = { Post };
  