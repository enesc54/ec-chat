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

    searchUser(searchTerm, response) {
        this.socket.emit("searchUser", searchTerm, response);
    }

    getUserProfile(username, response) {
        this.socket.emit("getUserProfile", username, response);
    }

    sendFriendRequest(senderUsername, recipientUsername) {
        this.socket.emit(
            "sendFriendRequest",
            senderUsername,
            recipientUsername
        );
    }

    followupStatus(senderUsername, recipientUsername, response) {
        this.socket.emit(
            "followupStatus",
            senderUsername,
            recipientUsername,
            response
        );
    }

    cancelFriendRequest(senderUsername, recipientUsername) {
        this.socket.emit(
            "cancelFriendRequest",
            senderUsername,
            recipientUsername
        );
    }

    deleteFriend(username, friendUsername) {
        this.socket.emit("deleteFriend", username, friendUsername);
    }

    friendRequests(username, response) {
        this.socket.emit("friendRequests", username, response);
    }

    acceptRequest(username, reqUsername) {
        this.socket.emit("acceptRequest", username, reqUsername);
    }

    rejectRequest(username, reqUsername) {
        this.socket.emit("rejectRequest", username, reqUsername);
    }
}

export default UserSocket;
