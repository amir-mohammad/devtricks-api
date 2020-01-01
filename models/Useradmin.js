const mongoose = require('mongoose');

const UseradminSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    access:{
        type:Array

    },
    logs:{
        type:Array
    }
});

module.exports = mongoose.model('Useradmin',UseradminSchema);