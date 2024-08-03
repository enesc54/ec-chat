import { Outlet } from "react-router-dom";
import { useState } from "react";

function AuthLayout() {
    const [alertView, setAlertView] = useState();
    return (
        <div className='h-dvh grid content-center justify-items-center bg-[#007BFF]'>
            <div className='w-[90%] shadow-2xl sm:w-2/5 grid content-center justify-items-center py-2 h-[70vh] rounded-2xl bg-white'>
                <Outlet context={[setAlertView]} />
            </div>
            {alertView}
        </div>
    );
}

export default AuthLayout;
