const express = require('express');
const app = express();

app.get('/testNode', (_req, res) => {
    res.status(200).send('Yes the testNode endpoint worked'); // Remove the comma
});

module.exports = app;
