const app = require('./app'); // Importing the Express app from app.js
const port = process.env.PORT || 3000; // Use the environment variable PORT or default to 3000

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`The app is listening on port ${port}`);
});
