import { isLoggedIn,getRole } from "../utils/userUtils";
import { Navigate } from "react-router-dom";

export default function RoleProtectedRoute({ children, allowedRoles }) {
 if(!isLoggedIn()) {

    return <Navigate to="/admin-login" replace />;
 }
 
 const role = getRole();

 if( !allowedRoles.includes(role) ){

    return <Navigate to="/" replace />;
 }

 return children;
 
}

