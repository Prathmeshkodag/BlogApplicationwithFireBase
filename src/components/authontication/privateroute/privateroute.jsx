import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../context/authcontext/authcontext";


export default function PrivateRoute() {
    const { userLoggedIn, loading } = useAuth();

    if (loading) {
        return <h6>Loading...</h6>;
    }

    return userLoggedIn==true ? <Outlet /> : <Navigate to="/" replace />;
}
