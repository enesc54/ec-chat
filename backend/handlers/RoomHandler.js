const Room = require("../models/room");

class RoomHandler {
    constructor(socket) {
        this.socket = socket;
        this.room = new Room();
    }

    initialize() {
        this.socket.on("getUserRooms", this.getUserRooms.bind(this));
        this.socket.on("saveRoom", this.saveRoom.bind(this));
    }

    async getUserRooms(userId, response) {
        const result = await this.room.getRooms(userId);

        response(result);
    }

    async saveRoom(roomData) {
        this.room.save(roomData);
    }
}

module.exports = RoomHandler;
