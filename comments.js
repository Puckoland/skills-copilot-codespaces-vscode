// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

// Parse JSON
app.use(bodyParser.json());

// Read comments from file
app.get('/comments', (req, res) => {
    fs.readFile('./comments.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('An error occurred');
            return;
        }
        res.send(data);
    });
});

// Write comments to file
app.post('/comments', (req, res) => {
    fs.writeFile('./comments.json', JSON.stringify(req.body), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('An error occurred');
            return;
        }
        res.send('Data written to file');
    });
});

// Start server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});