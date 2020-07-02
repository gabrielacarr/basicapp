const express = require('express');
const path = require('path');

// Init app
const app = express();

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Home Route 
// Displays articles
app.get('/', (req, res) => { // get request to home page
        let articles = [ // static array of objects passed through view that loops through it
            {
                id: 1,
                title: 'Article One',
                author: 'John Doe',
                body: 'This is article one'
        
            },
            {
                id: 2,
                title: 'Article Two',
                author: 'John Doe',
                body: 'This is article two'
        
            },
            {
                id: 3,
                title: 'Article Three',
                author: 'John Doe',
                body: 'This is article three'
        
            }
        ]
        res.render('index', {
            title: 'Articles',
            articles: articles
        });
}); 

// Add Route
app.get('/articles/add', (req, res) => {
    res.render('add_article', { // render another route
        title: 'Add Article'
    });
})

// Start Server
app.listen(3001, () => {  // listen, takes the port and call back
    console.log('Server started on port 3001...')
} );