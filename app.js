require('dotenv').config();
const express = require('express'); //required to use 'express' module that allows to template our pages
const path = require("path"); //required to use 'path' module that gets the current directory
const app = express(); //create an app from express
const port = 8900; //define our port number, this doesn’t have to be 3000

//------------------------File upload---------------------------
const fileUpload = require("express-fileupload");
app.use(fileUpload());


// Set up the 'views' directory for EJS templates
app.set('views', path.join(__dirname, 'views'));
// Set EJS as the view engine
app.set('view engine', 'ejs');

// Define a basic route for the root URL ("/")
app.get('/', (req, res) => {
    res.send('Hello, You\'ve reached your App!!!');
});


// Start the server
app.listen(port, () => console.log(`App listening on port ${port}!`));

const DBCONFIG = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
};

const mysql = require("mysql");
let connection = mysql.createConnection(DBCONFIG);


function onConnectionReady(error) {
    if (error != null) {
        console.log("connection failed");
        console.log(error);    //there's an error - deal with it
    } else {
        console.log("connection successful");
        //there's no error - success
    }
}

connection.connect(onConnectionReady);
// page that displays user details
app.get("/userdetails/:id", (req, res) => {
    const user_id = req.params.id; 
    const query = "SELECT * FROM `users` WHERE user_id = ?";
   
    connection.query(query,  [user_id], function(error, result, _fields) {
        if (error != null) {
            console.error(error);
            return;
        }
        res.render("user_page", {
            data: {
                result,
            },
        });
    });
});
// page that lists all users
app.get("/allusers/", (req, res) => {
    const query = "SELECT * FROM `users`";
    connection.query(query, function(error, result, _fields) {
        if (error != null) {
            console.error(error);
            return;
        }
        res.render("user_overview", {
            data: {
                result,
            },
        });
    });
});

// route where users can upload files
app.get("/uploadpage", (req, res) => {
    return res.render("upload-image");
});

/// Route to handle the form submission
app.post('/upload', async(req, res) => {
    console.log("uploading image");
    // Access form data, including the image, caption, alt-text etc
    const caption = req.body.caption;
    const uploadedFile = req.files.image;
    const author = req.body.author;
    const altText = req.body.altText;
    
    let newfilename = date() + uploadedFile.name;

    // Move the uploaded image to a specified folder
    const uploadPath = path.join(__dirname, 'assets/uploads', newfilename);
    uploadedFile.mv(uploadPath, (err) => {
        if (err) { //debug error if occurs
            return res.status(500).send(err);
        }

        console.log("uploaded to" + uploadPath);
        res.send('File uploaded!');
        const query = "INSERT INTO photos (author_id, date, path, caption, alt_text) VALUES (?, NOW(), ?, ?, ?)";
        
        connection.query(query, [author, newfilename, caption, altText], (error, results, fields) => {
            if (error) {
              console.error('Error inserting into database:', error);
              return;
            }
            
            console.log('Inserted into database successfully.');
          });
    });

    // Send a response
    console.log('Form submitted successfully!');
});


//later use this to import all the routes from mainroutes.js

/*
const routes = require('./routes/mainroutes); //Import routes.js file
app.use('/', routes); //add the Router to the middleware handling path
 */