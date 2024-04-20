const knex = require('knex');
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

const Login = {
    verifyUser: async (name, email) => {
        try {
            const user = await this.db.select('*').from('users').where({ username: name, email_address: email }).first();
            console.log("Query Ran:", this.db.client.lastQuery());
            return user || {};
        } catch (error) {
            console.error("Knex Query Error:", error);
            throw error;
        }
    }
};
module.exports = {Login};