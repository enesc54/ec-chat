import Entry from "components/Entry";
import Button from "components/Button";
import Alert from "components/Alert";

import { useState, useEffect } from "react";
import {
    useNavigate,
    useSearchParams,
    useOutletContext
} from "react-router-dom";
import { UserSocket } from "socketio";

function ResetPassword() {
    const [searchParams] = useSearchParams();
    var oobCode = searchParams.get("oobCode");

    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const [error, setError] = useState();
    const [setAlertView] = useOutletContext();

    useEffect(() => {
        if (error) {
            setAlertView(
                <Alert
                    type="error"
                    message={error.message}
                    setVisible={setAlertView}
                />
            );
        }
    }, [error, setAlertView]);

    const navigate = useNavigate();

    const resetClick = () => {
        if (password && password === confirmPassword) {
            UserSocket.passwordReset({ oobCode, password }, response => {
                if (response.status && response.status !== 200) {
                    setError(response);
                } else if (response.status && response.status === 200) {
                    navigate("/auth/login");
                }
            });
        } else {
            setAlertView(
                <Alert
                    type="error"
                    message="Girilen şifreler aynı değil..."
                    setVisible={setAlertView}
                />
            );
        }
    };

    return (
        <>
            <Entry
                password
                placeholder="Password"
                text={password}
                setText={setPassword}
            />
            <Entry
                password
                placeholder="Confirm Password"
                text={confirmPassword}
                setText={setConfirmPassword}
            />
            <Button text="Reset Password" onClick={resetClick} />
        </>
    );
}

export default ResetPassword;
