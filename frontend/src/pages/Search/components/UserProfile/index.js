//import { useParams } from "react-router-dom";
import Button from "components/Button";

import { UserSocket } from "socketio";

import { useState, useEffect } from "react";

function UserProfile(props) {
    const { user } = props;
    const [buttonText, setButtonText] = useState("Arkadaş Ekle");
    const [buttonColors, setButtonColors] = useState();
    const [followupStatus, setFollowupStatus] = useState();

    useEffect(() => {
        UserSocket.followupStatus(
            localStorage.getObject("currentUser").username,
            user?.username,
            response => {
                setFollowupStatus(response);
                if (response === "friend") {
                    setButtonText("Arkadaşlıktan Çıkar");
                } else if (response === "request") {
                    setButtonText("İstek Gönderildi");
                } else if (response === "none") {
                    setButtonText("Arkadaş Ekle");
                }
            }
        );
    }, [user]);

    const deleteFriend = () => {
        UserSocket.deleteFriend(
            localStorage.getObject("currentUser").username,
            user.username
        );
        setFollowupStatus("none");
        setButtonText("Arkadaş Ekle");
    };

    const cancelRequest = () => {
        UserSocket.cancelFriendRequest(
            localStorage.getObject("currentUser").username,
            user.username
        );
        setFollowupStatus("none");
        setButtonText("Arkadaş Ekle");
    };

    const sendRequest = () => {
        UserSocket.sendFriendRequest(
            localStorage.getObject("currentUser").username,
            user.username
        );
        setFollowupStatus("request");
        setButtonText("İstek Gönderildi");
    };
    const handleClick = () => {
        if (followupStatus === "friend") {
            deleteFriend();
        } else if (followupStatus === "request") {
            cancelRequest();
        } else if (followupStatus === "none") {
            sendRequest();
        }
    };

    useEffect(() => {
        if (followupStatus === "friend") {
            setButtonColors({
                main: "bg-red-500",
                hover: "bg-red-800"
            });
        } else if (followupStatus === "request") {
            setButtonColors({ main: "bg-gray-500", hover: "bg-gray-800" });
        } else if (followupStatus === "none") {
            setButtonColors({ main: "bg-[#007BFF] ", hover: "bg-[#0056b3]" });
        }
    }, [followupStatus]);

    return (
        <div
            onClick={() => {
                props.setVisible(false);
            }}
            className={`${
                !props.visible && "hidden"
            } absolute flex justify-center items-center bg-[rgba(0,0,0,0.5)] h-dvh w-screen`}
        >
            <div
                onClick={e => {
                    e.stopPropagation();
                }}
                className='bg-white rounded-2xl grid grid-cols-3 gap-4 p-6 flex flex-col items-center'
            >
                <img
                    src={user?.profilePhoto}
                    alt={user?.name}
                    className='h-40 w-40 rounded-full'
                />
                <div className='flex flex-col'>
                    <div className='font-bold'>{user?.username}</div>
                    <div>{user?.name}</div>
                </div>

                <Button
                    color={buttonColors?.main}
                    hoverColor={"hover:" + buttonColors?.hover}
                    text={buttonText}
                    onClick={handleClick}
                />
            </div>
        </div>
    );
}

export default UserProfile;
