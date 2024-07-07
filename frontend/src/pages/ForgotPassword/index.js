import Entry from "components/Entry";
import Button from "components/Button";
import Alert from "components/Alert";

import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { UserSocket } from "socketio";

function ForgotPassword() {
    const [email, setEmail] = useState();

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

    

    const resetClick = () => {
        UserSocket.sendPasswordResetEmail(email, response => {
            if (response.status && response.status !== 200) {
                setError(response);
            } else if (response.status && response.status === 200) {
                //success
            }
        });
    };

    return (
        <>
            <Entry placeholder="Email" text={email} setText={setEmail} />
            <Button text="Send Email" onClick={resetClick} />
        </>
    );
}

export default ForgotPassword;
