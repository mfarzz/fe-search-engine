import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const ProtectedRoute = ({ children, roles }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" replace />;

  try {
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;

    if (!roles.includes(userRole)) return <Navigate to="/login" replace />;

    return children;
  } catch (error) {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
