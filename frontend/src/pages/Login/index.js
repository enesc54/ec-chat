import Entry from "components/Entry";
import Button from "components/Button";
import Alert from "components/Alert";

import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import { UserSocket } from "socketio";

function Login() {
    const [email, setEmail] = useState({ message: "dkdk" });
    const [password, setPassword] = useState();

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

    const loginClick = () => {
        UserSocket.login(email, password, response => {
            if (response.status && response.status !== 200) {
                setError(response);
            } else if (response.status && response.status === 200) {
                localStorage.setObject("currentUser", response.currentUser);
                  navigate("/chats");
            }
        });
    };

    return (
        <>
            <Entry placeholder="Email" text={email} setText={setEmail} />
            <Entry
                placeholder="Password"
                text={password}
                setText={setPassword}
                password
            />
            <Button text="Login" onClick={loginClick} />
            <div
                className="text-sm font-bold"
                onClick={() => {
                    navigate("/forgot-password");
                }}
            >
                Reset Password
            </div>
        </>
    );
}

export default Login;
