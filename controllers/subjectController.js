const {

    getAllSubjects

}
=
require(
"../services/subjectService"
);

const getSubjects =
async(req,res)=>{

    try{

        const subjects =
        await getAllSubjects();

        res.status(200)
        .json(subjects);

    }
    catch(error){

        res.status(500)
        .json({

            msg:error.message

        });

    }

};

module.exports = {

    getSubjects

};