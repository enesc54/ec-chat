const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const { UserHandler, RoomHandler, MessageHandler } = require("./handlers");

const app = express();

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", socket => {
    const userHandler = new UserHandler(socket);
    const roomHandler = new RoomHandler(socket);
    const messageHandler = new MessageHandler(socket);

    userHandler.initialize();
    roomHandler.initialize();
    messageHandler.initialize();
});

const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
