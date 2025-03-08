const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname)));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.json());

app.post('/send-log', (req, res) => {
    const logData = req.body;
    console.log('Received:', logData);

    fs.appendFile('logs.txt', JSON.stringify(logData) + '\n', (err) => {
        if (err) console.error('Error saving log:', err);
    });

    res.send('Log received successfully');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
