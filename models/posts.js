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
    getPost: async (user_id) => {
      return await db.select("*").from("posts").where("author_id", user_id).first();
    }//,
    // upload posts
    /*
    uploadPost: async(user_id) => {
      return await db.insert({post_date: NOW()}, {path:}, {caption:}, {alt_text:}, {photo:}, {course:}, {collaboration_id}).into("posts").where("author_id", user_id);
    } 
    // ksenias version 
  createPost: async (fieldsToUpdate) => {
    fieldsToUpdate.post_created = new Date();
    const result = await db("posts").insert(fieldsToUpdate);
    const post_id = result[0];
    return Post.getPost(post_id);
  },

    */
  };
  // INSERT INTO `posts`(`post_id`, `author_id`, `post_date`, `path`, `caption`, `alt_text`, `photo`, `course`, `collaboration_id`)
  module.exports = { Post };
  