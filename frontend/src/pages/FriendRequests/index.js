import RequestView from "./components/RequestView";

import { UserSocket } from "socketio";

import { useState, useEffect } from "react";

function FriendRequests() {
    const [friendRequests, setFriendRequests] = useState();

    const deleteReq = user => {
      const reqList = friendRequests
        reqList.splice(friendRequests.indexOf(user), 1);
        setFriendRequests([...reqList]);
    };
    useEffect(() => {
        UserSocket.friendRequests(
            localStorage.getObject("currentUser").username,
            response => {
                setFriendRequests(response);
            }
        );
    }, []);

    return (
        <div className='h-dvh flex justify-center bg-[#007BFF]'>
            <div className='w-[90%] rounded-2xl bg-gray-50 flex flex-col p-5 m-10 shadow-2xl max-h-[calc(100dvh-80px)]'>
                {friendRequests?.map((item, index) => {
                    return (
                        <RequestView
                            user={{
                                username: item.username,
                                name: item.fullname,
                                profilePhoto: item.profilePhoto
                            }}
                            deleteReq={deleteReq}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default FriendRequests;
