const mongoose = require('mongoose');
const config = require('config');
const db = config.get('MongoURL');


const connectDB = () =>{
    mongoose.connect(db,{
        useNewUrlParser:true,
        useFindAndModify:false,
        useCreateIndex:true,
        useUnifiedTopology:true
    },() =>{
        try {
            console.log("MongoDB is conncted");
            return true
        } catch (error) {
            console.log("MongoDB is not connected" + error);
            process.exit(1);
            return false;
        }
    })
}

module.exports = connectDB;