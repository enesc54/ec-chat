const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const User = require("./models/user");

const app = express();
app.get("/", (req, res) => {
    res.send("server");
});

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 
          "*"
        ,
        methods: ["GET", "POST"]
    }
});

io.on("connection", socket => {
    socket.on("createUser", async (user, response) => {
        var dbUser = new User();
        const result = await dbUser.create(
            user.email,
            user.password,
            user.userData
        );
        console.error(result);
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
});

const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
