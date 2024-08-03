const Message = require("../models/message");

class MessageHandler {
    constructor(socket) {
        this.socket = socket;
        this.message = new Message();
    }

    initialize() {
        this.socket.on("getRoomMessages", this.getRoomMessages.bind(this));
        this.socket.on("sendMessage", this.sendMessage.bind(this));
    }

    async getRoomMessages(roomId) {
        await this.message.getMessages(roomId, this.socket);
    }

    async sendMessage(roomId, messageData) {
        await this.message.sendMessage(roomId, messageData);
    }
}

module.exports = MessageHandler;
