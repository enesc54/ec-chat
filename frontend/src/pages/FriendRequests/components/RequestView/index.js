import Button from "components/Button";

import { UserSocket } from "socketio";

function RequestView(props) {
    const { user } = props;
    return (
        <div className='bg-white shadow-md rounded-xl px-4 p-2 grid grid-cols-3 m-2'>
            <div className='flex flex-row gap-4 items-center'>
                <img
                    src={user.profilePhoto}
                    alt={user.username}
                    className='rounded-full w-16 h-16'
                />
                <div>
                    <div className='font-bold'>{user.username}</div>
                    <div>{user.name}</div>
                </div>
            </div>
            <Button
                text='Reddet'
                color='bg-red-500'
                hoverColor='bg-red-800'
                onClick={() => {
                    UserSocket.rejectRequest(
                        localStorage.getObject("currentUser").username,
                        user.username
                    );

                    props.deleteReq(user);
                }}
            />
            <Button
                text='Kabul Et'
                onClick={() => {
                    UserSocket.acceptRequest(
                        localStorage.getObject("currentUser").username,
                        user.username
                    );

                    props.deleteReq(user);
                }}
            />
        </div>
    );
}

export default RequestView;
