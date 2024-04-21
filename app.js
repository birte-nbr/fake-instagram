require('dotenv').config();
const express = require('express'); //required to use 'express' module that allows to template our pages
const path = require("path"); //required to use 'path' module that gets the current directory
const app = express(); //create an app from express
const port = process.env.PORT; //define our port number, this doesn’t have to be 3000
const session = require('express-session');
const users = require('./routes/UserRoutes'); // importing all user routes
const posts = require('./routes/PostsRoutes'); // importing all post routes
const login = require('./routes/LoginRoutes');


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

app.use(session({
  secret: 'schloss-einstein', 
  resave: false,  
  saveUninitialized: false  
}))
// Start the server
app.listen(port, () => console.log(`App listening on port ${port}!`));



// route where users can upload files
/*
app.get("/uploadpage", (req, res) => {
    let chooseImage = true;
    return res.render("upload-image", { chooseImage });
});*/

/// Route to handle the form submission
/*
app.post('/upload', async(req, res) => {
    console.log("uploading image");
    // Access form data, including the image, caption, alt-text etc
    const caption = req.body.caption;
    
    const author = req.body.author;
    const altText = req.body.altText;
    
    

    // Move the uploaded image to a specified folder
    
    

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

*/

