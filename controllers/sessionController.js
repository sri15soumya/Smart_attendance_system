const sessionService =
require("../services/sessionService");

const startSession =
async(req,res)=>{

    try{

        const result =
        await sessionService
        .startSession({

            facultyId:req.user.id,
            classroomId:req.body.classroomId,
            subject:req.body.subject
        });

        res.status(200).json(result);

    }
    catch(error){

        res.status(400)
        .json({

            msg:
            error.message

        });

    }

};



const facultySessionHistory=async(req,res)=>{
    try{
        const result=await sessionService.getFacultySessions(req.user.id);
        res.status(200).json(result);
    }catch(error){
        res.status(500).json({msg: error.message})
    }
}


const attendanceByDate =
async(req,res)=>{

    try{

        const result =
        await sessionService
        .getAttendanceByDate(

            req.user.id,

            req.query.date

        );

        res.status(200)
        .json(result);

    }
    catch(error){

        res.status(400)
        .json({

            msg:
            error.message

        });

    }

};



module.exports = {
    startSession,
    facultySessionHistory,
    attendanceByDate
};