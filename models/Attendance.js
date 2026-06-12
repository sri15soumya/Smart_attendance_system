const mongoose =
require("mongoose");
// Attendance is linked to a specific session and student, and records the location and time of attendance marking  
const attendanceSchema =
new mongoose.Schema({

    sessionId:{
        type:String,
        required:true
    },

    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    latitude:Number,

    longitude:Number,

    distanceFromClass:Number,

    timestamp:{
        type:Date,
        default:Date.now
    }

});

// compund index to ensure a student can mark attendance only once per session
// stores the data in the from (sessionID, studentId) and ensures uniqueness
// follows leftmost prefix rule, so we can query by sessionId or by sessionId and studentId, but not by studentId alone
attendanceSchema.index(
{
   sessionId:1,
   studentId:1
},
{
   unique:true
}
);

module.exports =
mongoose.model(
   "Attendance",
   attendanceSchema
);