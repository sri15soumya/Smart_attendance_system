import api from "./api";

export const getClassrooms =
(token)=>{

    return api.get(
        "/classrooms",
        {

            headers:{

                Authorization:
                `Bearer ${token}`

            }

        }
    );

};