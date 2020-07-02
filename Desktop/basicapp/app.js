const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodek');
let db = mongoose.connection;

// Check Connection
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Check for DB errors
db.on('error', (err) => {
    console.log(err);
})

// Init app
const app = express();

// Bring Models
let Article = require('./models/article');

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Home Route 
// Displays articles
// get request to home page
// passing functions to query
app.get('/', (req, res) => { 
    Article.find({}, (err, articles) => {
        if(err){
            console.log(err);
        } else {
            res.render('index', {
            title: 'Articles',
            articles: articles
        });
        }
    });
}); 
// Results should reflect from the database 
// Article Three relfects on local

// Add Route
app.get('/articles/add', (req, res) => {
    res.render('add_article', { // render another route
        title: 'Add Article'
    });
})

// Start Server
app.listen(3001, () => {  // listen, takes the port and call back
    console.log('Server started on port 3001...')
});