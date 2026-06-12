import api from "./api"

export const getSubjects=(token)=>{
    return api.get(
        "/subjects",
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    );
}


