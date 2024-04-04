require('dotenv').config();
const express = require('express'); //required to use 'express' module that allows to template our pages
const path = require("path"); //required to use 'path' module that gets the current directory
const app = express(); //create an app from express
const port = process.env.PORT; //define our port number, this doesn’t have to be 3000
const users = require('./routes/UserRoutes'); // importing all user routes
//------------------------File upload---------------------------
const fileUpload = require("express-fileupload");
app.use(fileUpload());

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.use(users);  // setting user paths

// Set up the 'views' directory for EJS templates
app.set('views', path.join(__dirname, 'views'));

// Start the server
app.listen(port, () => console.log(`App listening on port ${port}!`));



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