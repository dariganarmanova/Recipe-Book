const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

async function connectToDatabase() {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB successully');
    } catch (error) {
        console.log('Could not connect to MongoDB', error);
    }
};

module.exports = { connectToDatabase };