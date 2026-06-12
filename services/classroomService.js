const Classroom= require("../models/Classroom");

const createClassroom =async(data)=>{
   const{
    name, longitude,latitude,radius
   }=data

   const existing = await Classroom.findOne({
    name
   });

   if(existing){
    throw new  Error("Classroom already exists");
   }

   const classroom= await Classroom.create({
    name,longitude,latitude,radius
   })

   return classroom;
};

const getAllClassroom=async()=>{
    return await Classroom.find();
};

const deleteClassrooms=async(data)=>{
  const classroom= await Classroom.findByIdAndDelete(data);

  if(!classroom){
    throw new Error("classroom not found");
  };

  return {
    msg:"Classroom deleted"
  }
}

module.exports={
     createClassroom,

    getAllClassroom,

    deleteClassrooms

};