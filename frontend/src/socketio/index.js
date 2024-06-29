import Auth from "./AuthSocket";

import { io } from "socket.io-client";

const socket = io("https://ec-chat-server.koyeb.app/");

var AuthSocket = new Auth(socket);

export { AuthSocket };
