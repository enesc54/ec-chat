import Auth from "./AuthSocket";
import Room from "./RoomSocket";
import Message from "./MessageSocket";

import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_SOCKETIO_URL);

const AuthSocket = new Auth(socket);
const RoomSocket = new Room(socket);
const MessageSocket = new Message(socket);

export { AuthSocket, RoomSocket, MessageSocket };
