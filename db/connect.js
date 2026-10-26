const mongoose = require('mongoose');



const connectDB = async (uri) =>{
    try{
        await mongoose.connect(uri)
        console.log("Connected to MongoDB...")

    }
    catch(error){
        console.error("MongoDB connection error: ",error.message);

    }
}
// EELTXPL6Liadv2Pw

module.exports = connectDB;