import { Outlet, Navigate } from "react-router-dom";

function PrivateRoute() {
    const user = localStorage.getObject("currentUser");

    if (user) {
        return <Outlet />;
    } else {
        return <Navigate to='/auth/login' replace />;
    }
}

export default PrivateRoute;
