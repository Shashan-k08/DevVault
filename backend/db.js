const mongoose = require('mongoose');

const mongoURI ="mongodb://Shashan_k08:Shashanktiwari123456@ac-kqvvxsf-shard-00-00.ikfvhoz.mongodb.net:27017,ac-kqvvxsf-shard-00-01.ikfvhoz.mongodb.net:27017,ac-kqvvxsf-shard-00-02.ikfvhoz.mongodb.net:27017/?ssl=true&replicaSet=atlas-i7ps5d-shard-0&authSource=admin&retryWrites=true&w=majority"

const connectToMongo =()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to mongo successfully");
    })
}
module.exports = connectToMongo;