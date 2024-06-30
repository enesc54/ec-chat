import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "pages/Login";
import SignUp from "pages/SignUp";
import ForgotPassword from "pages/ForgotPassword";
import ResetPassword from "pages/ResetPassword";

import Chats from "pages/Chats";

import AuthLayout from "layouts/AuthLayout";

import PrivateRoute from "./PrivateRoute";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route path="/auth" element={<AuthLayout />}>
                        <Route
                            index
                            element={<Navigate to="/auth/login" replace />}
                        />
                        <Route index path="login" element={<Login />} />
                        <Route path="signup" element={<SignUp />} />
                        <Route
                            path="forgot-password"
                            element={<ForgotPassword />}
                        />
                        <Route
                            path="reset-password"
                            element={<ResetPassword />}
                        />
                    </Route>
                    <Route path="/chats" element={<PrivateRoute />} ><Route index element={<Chats/>}/></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
