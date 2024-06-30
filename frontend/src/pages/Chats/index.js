import LeftMenuItem from "./components/LeftMenuItem";
import MessageView from "./components/MessageView";

import Entry from "components/Entry";
import { IoSend } from "react-icons/io5";

import { useState, useEffect } from "react";

import { RoomSocket, MessageSocket } from "socketio";

function Chats() {
    const [activeRoom, setActiveRoom] = useState();
    const [messageText, setMessageText] = useState();

    const [roomList, setRoomList] = useState([]);
    var roomItemList = [];
    useEffect(() => {
        RoomSocket.getRooms(
            localStorage.getObject("currentUser").userId,
            response => {
                setRoomList(response);
            }
        );
    }, []);

    roomList.forEach(item => {
        roomItemList.push(
            <LeftMenuItem
                id={item.room_id}
                roomName={item.name}
                roomImg={item.roomImg}
                active={activeRoom}
                setActive={setActiveRoom}
            />
        );
    });

    const [messageList, setMessageList] = useState([]);
    var messageItemList = [];
    useEffect(() => {
        if (activeRoom) {
            MessageSocket.getMessages(activeRoom);
            MessageSocket.messages(activeRoom, response => {
                setMessageList(response);
            });
        }
    }, [activeRoom]);

    messageList.forEach(item => {
        messageItemList = [
            <MessageView
                text={item.text}
                senderId={item.senderId}
                timeStamp={item.timeStamp}
            />,
            ...messageItemList
        ];
    });

    return (
        <div className="h-dvh grid grid-cols-12 bg-[#007BFF]">
            <div className="h-full grid justify-items-center col-span-3">
                <div className="w-[90%] rounded-2xl bg-gray-50 flex flex-col p-5 mr-0 m-10 shadow-2xl max-h-[calc(100dvh-80px)]">
                    <div className="font-lobster font-bold text-4xl ml-3 mb-3">
                        ec-chat
                    </div>
                    <div className="overflow-y-scroll no-scrollbar">
                        {roomItemList}
                    </div>
                </div>
            </div>
            <div className="col-span-9 h-full grid justify-items-center">
                <div className="w-[90%] rounded-2xl bg-gray-50 flex flex-col p-20 m-10 shadow-2xl h-[calc(100dvh-80px)] justify-end pb-10">
                    {messageItemList}
                    <div className="flex flex-row items-center mt-10">
                        <Entry text={setMessageText} setText={setMessageText} />
                        <div
                            onClick={() => {
                                MessageSocket.sendMessage(activeRoom, {
                                    text: messageText,
                                    timeStamp: Date.now(),
                                    senderId:
                                        localStorage.getObject("currentUser")
                                            .userId
                                });
                            }}
                        >
                            <IoSend className="w-16 h-16 p-4 bg-[#007BFF] rounded-xl mr-4" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chats;
