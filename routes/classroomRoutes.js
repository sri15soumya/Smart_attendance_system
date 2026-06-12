const express =
require("express");

const router =
express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const roleMiddleware =
require("../middleware/roleMiddleware");

const {

    createClassrooms,

    getAllClassrooms,

    deleteClassroom

} = require(
"../controllers/classroomController"
);

router.post(

    "/",

    authMiddleware,

    roleMiddleware(
        "faculty",
        "admin"
    ),

    createClassrooms

);

router.get(

    "/",

    authMiddleware,

    getAllClassrooms

);

router.delete(

    "/:id",

    authMiddleware,

    roleMiddleware(
        "admin"
    ),

    deleteClassroom

);

module.exports =router;