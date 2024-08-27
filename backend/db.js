const mongoose = require('mongoose');

const mongoURI = process.env.DB_CONNECTION_URL

const connectToMongo =()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to mongo successfully");
    })
}
module.exports = connectToMongo;