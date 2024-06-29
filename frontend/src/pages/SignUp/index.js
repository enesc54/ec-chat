import Entry from "components/Entry";
import Button from "components/Button";
import Alert from "components/Alert";

import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { AuthSocket } from "socketio";

function SignUp() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [fullname, setFullname] = useState();
    const [username, setUsername] = useState();

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

    const signUpClick = () => {
        AuthSocket.signup(
            {
                email,
                password,
                userData: { email, username, fullname }
            },
            response => {
                if (response.status && response.status !== 200) {
                    setError(response);
                } else if (response.status && response.status === 200) {
                    localStorage.setItem("currentUser", response.currentUser);
                    navigate("/chat");
                }
            }
        );
    };

    return (
        <>
            <Entry placeholder="Email" text={email} setText={setEmail} />
            <Entry
                placeholder="Full Name"
                text={fullname}
                setText={setFullname}
            />
            <Entry
                placeholder="User Name"
                text={username}
                setText={setUsername}
            />
            <Entry
                placeholder="Password"
                text={password}
                setText={setPassword}
                password
            />
            <Button text="Sign Up" onClick={signUpClick} />
        </>
    );
}

export default SignUp;
