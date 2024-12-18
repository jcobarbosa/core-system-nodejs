const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use('/api', userRoutes);

connectDB();

module.exports = app;
