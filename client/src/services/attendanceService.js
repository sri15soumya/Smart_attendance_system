import api from "./api";

export const markAttendance =
(data,token)=>{

    return api.post(

        "/attendance/mark-attendance",

        data,

        {

            headers:{

                Authorization:
                `Bearer ${token}`

            }

        }

    );

};


export const getAttendanceHistory =(token)=>{
    return api.get("/attendance/history",{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
);
}


export const getAttendanceSummary =
(token)=>{

    return api.get(

        "/attendance/summary",

        {

            headers:{

                Authorization:
                `Bearer ${token}`

            }

        }

    );

};
