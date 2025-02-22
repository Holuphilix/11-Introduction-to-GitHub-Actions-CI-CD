const app = require('./app'); // Importing app.js from the same directory
const port = process.env.PORT || 3000; // Use the environment variable PORT or default to 3000

// Start the server and listen on the specified port, binding to all interfaces
app.listen(port, '0.0.0.0', () => {
    console.log(`The app is listening on http://0.0.0.0:${port}`);
});
