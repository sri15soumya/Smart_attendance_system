const Subject =
require("../models/Subject");

const getAllSubjects =
async()=>{

    return await Subject.find();

};

module.exports = {

    getAllSubjects

};