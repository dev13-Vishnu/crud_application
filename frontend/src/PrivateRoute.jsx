import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, adminOnly = false }) => {
    const { user } = useSelector((state) => state.auth);
    
    if (!user) {
        return <Navigate to="/login" />;
    }
    
    // If the route requires an admin and the user is not an admin, redirect to home
    if (adminOnly && !user.isAdmin) {
        return <Navigate to="/home" />;
    }

    return children;
};

export default PrivateRoute;
