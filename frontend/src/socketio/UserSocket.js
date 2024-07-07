class UserSocket {
    constructor(socket) {
        this.socket = socket;
    }

    login(email, password, response) {
        this.socket.emit("loginUser", { email, password }, response);
    }
    signup(user, response) {
        this.socket.emit("createUser", user, response);
    }
    sendPasswordResetEmail(email, response) {
        this.socket.emit("sendResetPasswordEmail", email, response);
    }
    passwordReset(data, response) {
        this.socket.emit(
            "resetPassword",
            { code: data.oobCode, newPassword: data.password },
            response
        );
    }

    getFriends(userId, response) {
        this.socket.emit("getFriends", userId, response);
    }
}

export default UserSocket;
