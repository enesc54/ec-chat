import Entry from "components/Entry";

import { FaSearch } from "react-icons/fa";

import { useState, useEffect } from "react";

import { UserSocket } from "socketio";
import UserProfile from "./components/UserProfile";
function Search() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState();
    const [userProfileVisible, setUserProfileVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
  

    useEffect(() => {
        UserSocket.searchUser(searchTerm, response => {
            setUsers(response);
        });
    }, [searchTerm]);

    useEffect(() => {
        const filtered = users.filter(item => {
            if (
                item.username !== localStorage.getObject("currentUser").username
            ) {
                return item;
            }
            return null;
        });
        setFilteredUsers(filtered);
    }, [users]);

    useEffect(() => {
        if (selectedUser) {
            setUserProfileVisible(true);
        }
    }, [selectedUser]);

    return (
        <>
            <UserProfile
                user={selectedUser}
                visible={userProfileVisible}
                setVisible={setUserProfileVisible}
            />
            <div className="h-dvh flex justify-center bg-[#007BFF]">
                <div className="w-[90%] rounded-2xl bg-gray-50 flex flex-col p-5 m-10 shadow-2xl max-h-[calc(100dvh-80px)]">
                    <div className="flex flex-row items-center mb-10">
                        <Entry text={searchTerm} setText={setSearchTerm} />
                        <FaSearch className="w-16 h-16 p-4 bg-[#007BFF] rounded-xl mr-4" />
                    </div>
                    <div className="mx-4">
                        {searchTerm &&
                            filteredUsers.map((item, index) => {
                                return (
                                    <>
                                        {index !== 0 && <hr />}
                                        <div
                                            className="h-16 mt-1 p-2 flex items-center"
                                            onClick={() => {
                                                setSelectedUser(item);
                                            }}
                                        >
                                            <img
                                                className="h-12 rounded-full"
                                                src={item.profilePhoto}
                                                alt={item.name}
                                            />
                                            <div className="ml-3 flex flex-col">
                                                <div className="font-bold">
                                                    {item.username}
                                                </div>
                                                <div>{item.name}</div>
                                            </div>
                                        </div>
                                    </>
                                );
                            })}
                    </div>
                </div>
            </div>
        </>
    );
}
export default Search;
