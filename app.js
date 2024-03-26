require("dotenv").config();
const express = require('express'); //required to use 'express' module that allows to template our pages
const path = require("path"); //required to use 'path' module that gets the current directory
const app = express(); //create an app from express
const port = 3726; 

// Set up the 'views' directory for EJS templates
app.set('views', path.join(__dirname, 'views'));
// Set EJS as the view engine
app.set('view engine', 'ejs');

//------------------------File upload---------------------------
const fileUpload = require("express-fileupload");
app.use(fileUpload());


// Define a basic route for the root URL ("/")
app.get('/', (req, res) => {
    res.send('Hello, You\'ve reached your App!!!');
});


// Start the server
app.listen(port, () => console.log(`App listening on port ${port}`));



// Define a route for a specific URL ("/info") which renders the greetings.ejs page
app.get("/greeting/:greeting/:personName/:surname", (req, res) => {
    const greeting = req.params.greeting;
    const name = req.params.personName;
    const surname = req.params.surname;
    return res.render("greetings", {
        data: { greeting, name, surname },
    });
});
// profile set up 
app.get("/profile/:path/:personName/:surname", (req, res) => {
    const path = req.params.path;
    const name = req.params.personName;
    const surname = req.params.surname;
    return res.render("profile", {
        data: { path, name, surname},
    });
});
 
app.use(express.static("assets"));

// introducing database access

const DBCONFIG = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
}
// connecting to mysql 

const mysql = require("mysql2");

// establish connection 
function onConnectionReady(error) {
    if (error != null) {
        console.log("error message - failed to connect to server");   //there's an error - deal with it
        console.log(error);
    } else {
        console.log("connection to server successful");               //there's no error - success
    }
}
let connection = mysql.createConnection(DBCONFIG);

connection.connect(onConnectionReady);
/*
app.get("/users/:username", (req, res) => {
    const query = "SELECT * FROM `users` WHERE username ='" + req.params.username + "'";
    console.log(query);
    connection.query(query, function(error, result, _fields) {
        if (error != null) {
            console.error(error);
            return;
        }
        console.log(query); // Log the query if needed for debugging
        res.render("user_details", {
            data: {
                result,
            },
        });
    });
}); */

app.get("/testmysql/", (req, res) => {
    const query = "SELECT * FROM `users`";
    console.log(query);
    connection.query(query, function(error, result, _fields) {
        if (error != null) {
            console.error(error);
            return;
        }
        console.log(query); // Log the query if needed for debugging
        res.render("user_details", {
            data: {
                result,
            },
        });
    });
});

// Define a route for a specific URL ("/uploadpage") which renders the upload-image
app.get("/uploadpage", (req, res) => {
    return res.render("upload-image");
});



// Route to handle the form submission
// Route to handle the form submission
app.post('/upload', async(req, res) => {
    console.log("uploading image");
    // Access form data, including the image, caption, alt-text etc
    const caption = req.body.caption;
    const uploadedFile = req.files.image;
    const author = req.body.author;
    const altText = req.body.altText;
    
    let newfilename = "21.03.2024-" + uploadedFile.name;

    // Move the uploaded image to a specified folder
    const uploadPath = path.join(__dirname, 'assets/uploads', newfilename);
    uploadedFile.mv(uploadPath, (err) => {
        if (err) { //debug error if occurs
            return res.status(500).send(err);
        }
// Process the file as needed (e.g., save to database, send a response, etc.)
        // ...
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



