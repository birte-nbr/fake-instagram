<<<<<<< HEAD
require('dotenv').config();
const express = require('express'); //required to use 'express' module that allows to template our pages
const path = require("path"); //required to use 'path' module that gets the current directory
const app = express(); //create an app from express
const port = process.env.PORT; //define our port number, this doesn’t have to be 3000
//const session = require('express-session');
const users = require('./routes/UserRoutes'); // importing all user routes
const posts = require('./routes/PostsRoutes'); // importing all post routes
const login = require('./routes/LoginRoutes');
//const MySQLStore = require("express-mysql-session")(session);
/*
// set up session store for logging in users
const sessionStore = new MySQLStore({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  clearExpired: true,
  checkExpirationInterval: 900000,
  expiration: 86400000,
});
*/

//------------------------File upload---------------------------
const fileUpload = require("express-fileupload");
app.use(fileUpload());

// Set EJS as the view engine
app.set('view engine', 'ejs');


// Set up the 'views' directory for EJS templates
app.set('views', path.join(__dirname, 'views'));

// set up public directory for css
app.use(express.static(path.join(__dirname, './public')));

app.use(users);  // setting all paths
app.use(posts);
app.use(login);


// Start the server
app.listen(port, () => console.log(`App listening on port ${port}!`));


/*
sessionStore
  .onReady()
  .then(() => {
    // MySQL session store ready for use.
    console.log("MySQLStore ready");
  })
  .catch((error) => {
    // Something went wrong.
    console.error("MySQLStore error", error);
  });

*/


=======
require('dotenv').config();
const express = require('express'); //required to use 'express' module that allows to template our pages
const path = require("path"); //required to use 'path' module that gets the current directory
const app = express(); //create an app from express
const port = process.env.PORT; //define our port number, this doesn’t have to be 3000
//const session = require('express-session');
const users = require('./routes/UserRoutes'); // importing all user routes
const posts = require('./routes/PostsRoutes'); // importing all post routes
const login = require('./routes/LoginRoutes');
//const MySQLStore = require("express-mysql-session")(session);
/*
// set up session store for logging in users
const sessionStore = new MySQLStore({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  clearExpired: true,
  checkExpirationInterval: 900000,
  expiration: 86400000,
});
*/

//------------------------File upload---------------------------
const fileUpload = require("express-fileupload");
app.use(fileUpload());

// Set EJS as the view engine
app.set('view engine', 'ejs');


// Set up the 'views' directory for EJS templates
app.set('views', path.join(__dirname, 'views'));

// set up public directory for css
app.use(express.static(path.join(__dirname, './public')));

app.use(users);  // setting all paths
app.use(posts);
app.use(login);


// Start the server
app.listen(port, () => console.log(`App listening on port ${port}!`));


/*
sessionStore
  .onReady()
  .then(() => {
    // MySQL session store ready for use.
    console.log("MySQLStore ready");
  })
  .catch((error) => {
    // Something went wrong.
    console.error("MySQLStore error", error);
  });

*/


>>>>>>> origin/main
