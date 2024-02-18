const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

//connection string
const url = `mongodb+srv://abdulrafay12364:${process.env.PASSWORD}@cluster0.mc6i29v.mongodb.net/`;

const mongodbconnection = () => {
    mongoose.connect(url, console.log("Connection to Mongodb for Stripe Backend is Successfully made!"))
}
module.exports = mongodbconnection;