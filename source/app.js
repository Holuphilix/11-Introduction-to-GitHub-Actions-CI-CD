const express = require('express');
const app = express();

// Root route for / (http://34.237.242.97:3000/)
app.get('/', (_req, res) => {
    res.send('Welcome to the Node.js app!'); // Custom message for the root route
});

// Test route (optional, for testing /testNode endpoint)
app.get('/testNode', (_req, res) => {
    res.status(200).send('Yes the testNode endpoint worked');
});

module.exports = app;
