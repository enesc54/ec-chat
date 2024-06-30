class RoomSocket {
    constructor(socket) {
        this.socket = socket;
    }

    getRooms(userId,response){
      this.socket.emit("getUserRooms", userId, response
        )
    }
}

export default RoomSocket;
