const express = require('express');

// Init app
const app = express();

// Home Route 
app.get('/', (req, res) => { // Get requests to homepage
    res.send('Hello World')
})

// Start Server
app.listen(3001, () => {  // listen, takes the port and call back
    console.log('Server started on port 3000...')
} );