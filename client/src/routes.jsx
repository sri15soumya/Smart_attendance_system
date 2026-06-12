import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./pages/Login";
import Register from  "./pages/Register"
import FacultyDashboard from  "./pages/FacultyDashBoard"
import StudentDashboard from "./pages/StudentDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function AppRoutes(){
    return (
        <BrowserRouter>
        <Routes>
            <Route
                path="/"
                element={<Login />}
            />
              <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/faculty"
                    element={<ProtectedRoute allowedRole="faculty">
                        <FacultyDashboard/>
                        </ProtectedRoute>}
                />

                <Route
                    path="/student"
                    element={<ProtectedRoute allowedRole="student">
                         <StudentDashboard />
                    </ProtectedRoute>}
                   
                    />

        </Routes>
        </BrowserRouter>
    )
}
export default AppRoutes;
