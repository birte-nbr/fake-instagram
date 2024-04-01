const express = require('express');
const router = express.Router();
/*
Put all your routes here, written as router.get, router.post etc.
*/

// Define a route for the root URL ("/")
router.get('/', (req, res) => {
    res.render('main.ejs');
});


module.exports = router;