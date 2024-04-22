<<<<<<< HEAD
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

const User = {
  getUsers: async () => {
    return await db.select("*").from("users");
  },

  getUser: async (user_id) => {
    return await db.select("*").from("users").where("user_id", user_id).first();
  },
  createUser: async (fieldsToUpdate) => {
    const result = await db("users").insert(fieldsToUpdate);
    const user_id = result[0];  
    return User.getUser(user_id);
  }
  
};


module.exports = { User };
=======
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

const User = {
  getUsers: async () => {
    return await db.select("*").from("users");
  },

  getUser: async (user_id) => {
    return await db.select("*").from("users").where("user_id", user_id).first();
  },
  createUser: async (fieldsToUpdate) => {
    const result = await db("users").insert(fieldsToUpdate);
    const user_id = result[0];  
    return User.getUser(user_id);
  }
  
};


module.exports = { User };
>>>>>>> origin/main
