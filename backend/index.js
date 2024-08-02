const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const User = require("./models/user");
const Room = require("./models/room");
const Message = require("./models/message");

const app = express();

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", async socket => {
    socket.on("createUser", async (user, response) => {
        var dbUser = new User();
        const result = await dbUser.create(
            user.email,
            user.password,
            user.userData
        );

        response(result);
    });

    socket.on("loginUser", async (user, response) => {
        var dbUser = new User();
        const result = await dbUser.login(user.email, user.password);
        response(result);
    });

    socket.on("sendResetPasswordEmail", async (email, response) => {
        var dbUser = new User();
        const result = await dbUser.sendResetPasswordEmail(email);
        response(result);
    });

    socket.on("resetPassword", async (data, response) => {
        var dbUser = new User();
        const result = await dbUser.resetPassword(data.code, data.newPassword);
        response(result);
    });

    socket.on("getUserRooms", async (userId, response) => {
        var dbRoom = new Room();
        const result = await dbRoom.getRooms(userId);

        response(result);
    });

    socket.on("getRoomMessages", async roomId => {
        var dbMessage = new Message();
        await dbMessage.getMessages(roomId, socket);
    });

    socket.on("sendMessage", async (roomId, messageData) => {
        var dbMessage = new Message();
        await dbMessage.sendMessage(roomId, messageData);
    });

    socket.on("getFriends", async (userId, response) => {
        var dbUser = new User();
        const result = await dbUser.getFriends(userId);
        response(result);
    });

    socket.on("saveRoom", async roomData => {
        var dbRoom = new Room();
        dbRoom.save(roomData);
    });

    socket.on("getAllUsers", async response => {
        var dbUser = new User();
        const result = await dbUser.getAllUsers();
        response(result);
    });

    socket.on("searchUser", async (searchTerm, response) => {
        var dbUser = new User();
        const result = await dbUser.searchUser(searchTerm);
        response(result);
    });

    socket.on(
        "sendFriendRequest",
        async (senderUsername, recipientUsername) => {
            var dbUser = new User();
            await dbUser.sendFriendRequest(senderUsername, recipientUsername);
        }
    );

    socket.on(
        "followupStatus",
        async (senderUsername, recipientUsername, response) => {
            var dbUser = new User();
            var result = await dbUser.followupStatus(
                senderUsername,
                recipientUsername
            );
            response(result);
        }
    );

    socket.on(
        "cancelFriendRequest",
        async (senderUsername, recipientUsername) => {
            var dbUser = new User();
            await dbUser.cancelFriendRequest(senderUsername, recipientUsername);
        }
    );

    socket.on("deleteFriend", async (username, friendUsername) => {
        var dbUser = new User();
        await dbUser.deleteFriend(username, friendUsername);
    });

    socket.on("friendRequests", async (username, response) => {
        var dbUser = new User();
        var result = await dbUser.friendRequests(username);
        response(result);
    });

    socket.on("acceptRequest", async (username, reqUsername) => {
        var dbUser = new User();
        await dbUser.acceptRequest(username, reqUsername);
    });

    socket.on("rejectRequest", async (username, reqUsername) => {
        var dbUser = new User();
        await dbUser.rejectRequest(username, reqUsername);
    });
});

const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
