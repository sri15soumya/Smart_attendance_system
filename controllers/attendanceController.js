const attendanceService =
require(
   "../services/attendanceService"
);
const {getAttendanceHistory}=require("../services/attendanceService")

const markAttendance =
async(req,res)=>{

   try{

      const result =
      await attendanceService
      .markAttendance({

         studentId:
         req.user.id,

         token:
         req.body.token,

         latitude:
         req.body.latitude,

         longitude:
         req.body.longitude

      });

      res.status(200)
      .json(result);

   }catch(error){

      res.status(400)
      .json({
         msg:error.message
      });

   }

};

const attendanceHistory=async(req,res)=>{
   try{
      const history=await getAttendanceHistory(
         req.user.id
      );

      res.status(200).json(history)
   }catch(error){
      res.status(500).json({
         msg:error.message
      })
   }
}

const {

    getAttendanceSummary

}
=
require(
"../services/attendanceService"
);

const attendanceSummary =
async(req,res)=>{

    try{

        const summary =
        await getAttendanceSummary(

            req.user.id

        );

        res.status(200)
        .json(summary);

    }
    catch(error){

        res.status(500)
        .json({

            msg:error.message

        });

    }

};

module.exports = {
   markAttendance,attendanceHistory,attendanceSummary
};