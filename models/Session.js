const mongoose =
require("mongoose");
// this session is an event 
const sessionSchema =
new mongoose.Schema({

    sessionId:{
        type:String,
        unique:true,
        required:true
    },

    facultyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    classroomId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Classroom"
    },

    subject:{
        type:String,
        required:true
    },

    startTime:{
        type:Date,
        default:Date.now
    },

    expiry:{
        type:Number,
        required:true
    },

    isActive:{
        type:Boolean,
        default:true
    }

},{timestamps:true});

module.exports =
mongoose.model(
   "Session",
   sessionSchema
);