class RoomSocket {
    constructor(socket) {
        this.socket = socket;
    }

    getRooms(userId, response) {
        this.socket.emit("getUserRooms", userId, response);
    }

    saveRoom(roomData) {
        this.socket.emit("saveRoom", roomData);
    }
}

export default RoomSocket;
