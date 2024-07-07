import User from "./UserSocket";
import Room from "./RoomSocket";
import Message from "./MessageSocket";

import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_SOCKETIO_URL);

const UserSocket = new User(socket);
const RoomSocket = new Room(socket);
const MessageSocket = new Message(socket);

export { UserSocket, RoomSocket, MessageSocket };
