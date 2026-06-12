const mongoose = require("mongoose");

const classroomSchema =
new mongoose.Schema({

    name:{
        type:String,
        unique:true,
        required:true
    },

    latitude:{
        type:Number,
        required:true
    },

    longitude:{
        type:Number,
        required:true
    },

    radius:{
        type:Number,
        default:50
    }

},{timestamps:true});

module.exports =
mongoose.model(
   "Classroom",
   classroomSchema
);