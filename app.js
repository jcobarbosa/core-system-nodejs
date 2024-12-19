const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const app = express();

function initiateRoutes() {
    const routes_directory = require('path').resolve(__dirname) + '\\routes\\'; 

    fs.readdirSync(routes_directory).forEach(route_file => {
    try {
        app.use('/api/', require(routes_directory + route_file));
    } catch (error) {
        console.log(`Encountered Error initializing routes from ${route_file}`);
        console.log(error);
    }
    });
}

// Middleware
app.use(bodyParser.json());
initiateRoutes();

connectDB();

module.exports = app;
