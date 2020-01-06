const mongoose = require('mongoose');

const InstructorSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        
    },
    degree:{
        type:String,

    },
    resume:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    socials:[
        {
            type:String,
            url:String,
            icon:String
        }
    ]
});

module.exports = mongoose.model('Instructor',InstructorSchema);
