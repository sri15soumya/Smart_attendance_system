import { Navigate } from "react-router-dom";

function ProtectedRoute ({ children, allowedRole}){
    const token=localStorage.getItem("token");
    if(!token){
        return (<Navigate to="/"/>);}
        try{
            const payload=JSON.parse(atob(token.split(".")[1]))

            if(payload.role!==allowedRole){
                return (<Naviagte to="/"/>);
            }

            return children;
        } catch(error){
            return (
                <Navigate to="/"/>
            );
        }
    
}

export default ProtectedRoute;