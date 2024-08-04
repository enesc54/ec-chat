import Entry from "components/Entry";
import Button from "components/Button";

import { MdAdd } from "react-icons/md";
import { TiTimes } from "react-icons/ti";

import { useState, useEffect } from "react";

import { UserSocket, RoomSocket } from "socketio";

function NewRoomPopup(props) {
    const [roomName, setRoomName] = useState();
    const [searchTerm, setSearchTerm] = useState();
    const [friends, setFriends] = useState([]);
    const [addedFriends, setAddedFriends] = useState([]);
    const [roomImg, setRoomImg] = useState(null);

    useEffect(() => {
        if (friends.length === 0) {
            UserSocket.getFriends(
                localStorage.getObject("currentUser").userId,
                response => {
                    if (response) {
                        setFriends([...response]);
                    }
                }
            );
        }
    }, [friends]);

    const filteredFriends = friends.filter(item => {
        if (item.includes(searchTerm)) {
            return item;
        }
        return null;
    });

    const roomFriendAddClick = item => {
        const index = friends.indexOf(item);
        addedFriends.push(friends[index]);
        if (index > -1) {
            const itensCopy = Array.from(friends);
            itensCopy.splice(index, 1);
            setFriends(itensCopy);
        }
        setSearchTerm("");
    };

    const removeFriend = item => {
        const index = addedFriends.indexOf(item);
        friends.push(addedFriends[index]);
        if (index > -1) {
            const itensCopy = Array.from(addedFriends);
            itensCopy.splice(index, 1);
            setAddedFriends(itensCopy);
        }
    };

    const addRoomClick = () => {
        RoomSocket.saveRoom({
            name: roomName,
            roomImg: roomImg
                ? {
                      fileName: roomImg?.name,
                      fileData: roomImg
                  }
                : null,
            members: [
                ...addedFriends,
                localStorage.getObject("currentUser").username
            ]
        });
        props.setVisible(false);
    };

    useEffect(() => {
        if (!props.visible) {
            setSearchTerm();
            setFriends([]);
            setAddedFriends([]);
            setRoomName();
            setRoomImg();
        }
    }, [props.visible]);

    return (
        <div
            className={`${
                !props.visible && "hidden"
            } absolute flex justify-center items-center bg-[rgba(0,0,0,0.5)] h-dvh w-screen`}
        >
            <div className='w-1/2 bg-white rounded-2xl grid grid-cols-3 gap-2 p-6'>
                <div className='flex items-center'>Sohbet Logosu :</div>
                <div className='col-span-2 mx-4'>
                    <input
                        id='roomImg'
                        type='file'
                        accept='image/*'
                        onChange={e => {
                            setRoomImg(e.target.files[0]);
                        }}
                        hidden
                    />
                    <label for='roomImg'>
                        <div className='flex items-center px-4 py-2 w-fit rounded-lg bg-white'>
                            Fotoğraf Seç
                        </div>
                    </label>
                </div>
                <div className='flex items-center'>Sohbet Adı :</div>
                <div className='col-span-2'>
                    <Entry
                        text={roomName}
                        setText={setRoomName}
                        height='h-10'
                    />
                </div>
                <div className='flex items-center'>Kişiler :</div>
                <div className='col-span-2'>
                    <Entry
                        text={searchTerm}
                        setText={setSearchTerm}
                        height='h-8'
                    />
                    {searchTerm && (
                        <div className='absolute ml-4 mr-2 bg-white shadow rounded-xl'>
                            {filteredFriends.map((item, index) => (
                                <div
                                    index={index}
                                    className='flex flex-row items-center p-2'
                                >
                                    <div className='mx-2 w-full'>{item}</div>
                                    <button
                                        className='mx-2'
                                        onClick={() => roomFriendAddClick(item)}
                                    >
                                        <MdAdd className='h-full w-auto' />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {addedFriends.length > 0 && (
                        <div className='flex flex-wrap ml-4 mr-2'>
                            {addedFriends.map((item, index) => (
                                <div className='flex items-center px-2 py-1 m-1 rounded bg-[#007BFF] text-white'>
                                    {item}
                                    <TiTimes
                                        className='ml-1'
                                        onClick={() => {
                                            removeFriend(item);
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className='col-span-3 flex'>
                    <Button
                        text='İptal'
                        color='bg-red-500'
                        hoverColor='hover:bg-red-800'
                        onClick={() => {
                            props.setVisible(false);
                        }}
                    />
                    <Button text='Oluştur' onClick={addRoomClick} />
                </div>
            </div>
        </div>
    );
}

export default NewRoomPopup;
