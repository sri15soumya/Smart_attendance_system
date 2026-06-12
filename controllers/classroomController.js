const {
     createClassroom,

    getAllClassroom,

    deleteClassrooms

}=require(
    "../services/classroomService"
);
 

const createClassrooms =
async(req,res)=>{

    try{

        const result =
        await createClassroom(
            req.body
        );

        res.status(201)
        .json(result);

    }
    catch(error){

        res.status(400)
        .json({
            msg:error.message
        });

    }

};

const getAllClassrooms =
async(req,res)=>{

    try{

        const result =
        await 
        getAllClassroom();

        res.status(200)
        .json(result);

    }
    catch(error){

        res.status(400)
        .json({
            msg:error.message
        });

    }

};

const deleteClassroom =
async(req,res)=>{

    try{

        const result =
        await 
        deleteClassrooms(
            req.params.id
        );

        res.status(200)
        .json(result);

    }
    catch(error){

        res.status(400)
        .json({
            msg:error.message
        });

    }

};

module.exports = {

    createClassrooms,

    getAllClassrooms,

    deleteClassroom

};