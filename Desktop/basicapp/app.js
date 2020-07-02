const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



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

// Body Parser Middleware
// https://github.com/expressjs/body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

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
});

// Add Submit POST Route
app.post('/articles/add', (req, res) => {
   let article = new Article();
   article.title = req.body.title;
});

// Start Server
app.listen(3001, () => {  // listen, takes the port and call back
    console.log('Server started on port 3001...')
});