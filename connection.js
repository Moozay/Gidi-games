const  mongoose  = require("mongoose");

const URI = "mongodb+srv://moozay:12345@cluster0.ht2eq.mongodb.net/gidi?retryWrites=true&w=majority"


const connectDB = async ()=>{
    await mongoose.connect(URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    console.log("db connected...");
};

module.exports = connectDB;