import api from "./api";


export const startSession =
(data,token)=>{

    return api.post(

        "/sessions/start-session",

        data,

        {

            headers:{

                Authorization:
                `Bearer ${token}`

            }

        }

    );

};


export const getSessionHistory =
(token)=>{

    return api.get(

        "/sessions/history",

        {

            headers:{

                Authorization:
                `Bearer ${token}`

            }

        }

    );

};

export const getAttendanceByDate =
(date,token)=>{

    return api.get(

        `/sessions/attendance?date=${date}`,

        {

            headers:{

                Authorization:
                `Bearer ${token}`

            }

        }

    );

};