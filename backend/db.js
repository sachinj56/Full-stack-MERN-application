const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/backendInotebook"
const connecttoMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to Mongo DB successfully")
    })
}
module.exports = connecttoMongo;