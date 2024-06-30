class MessageSocket {
    constructor(socket) {
        this.socket = socket;
    }

    getMessages(roomId, response) {
        this.socket.emit("getRoomMessages", roomId, response);
    }
    messages(roomId, response) {
        this.socket.on(roomId, messages => {
            response(messages);
        });
    }
    sendMessage(roomId, message) {
        this.socket.emit("sendMessage", roomId, message);
    }
}

export default MessageSocket;
