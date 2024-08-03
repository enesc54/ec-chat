const User = require("../models/user");

class UserHandler {
    constructor(socket) {
        this.socket = socket;
        this.user = new User();
    }

    initialize() {
        this.socket.on("createUser", this.createUser.bind(this));
        this.socket.on("loginUser", this.loginUser.bind(this));
        this.socket.on(
            "sendResetPasswordEmail",
            this.sendResetPasswordEmail.bind(this)
        );
        this.socket.on("resetPassword", this.resetPassword.bind(this));
        this.socket.on("getFriends", this.getFriends.bind(this));
        this.socket.on("getAllUsers", this.getAllUsers.bind(this));
        this.socket.on("searchUser", this.searchUser.bind(this));
        this.socket.on("sendFriendRequest", this.sendFriendRequest.bind(this));
        this.socket.on("followupStatus", this.followupStatus.bind(this));
        this.socket.on(
            "cancelFriendRequest",
            this.cancelFriendRequest.bind(this)
        );
        this.socket.on("deleteFriend", this.deleteFriend.bind(this));
        this.socket.on("acceptRequest", this.acceptRequest.bind(this));
        this.socket.on("rejectRequest", this.rejectRequest.bind(this));
        this.socket.on("friendRequests", this.friendRequests.bind(this));
    }

    async createUser(user, response) {
        const result = await this.user.create(
            user.email,
            user.password,
            user.userData
        );

        response(result);
    }

    async loginUser(user, response) {
        const result = await this.user.login(user.email, user.password);
        response(result);
    }

    async sendResetPasswordEmail(email, response) {
        const result = await this.user.sendResetPasswordEmail(email);
        response(result);
    }

    async resetPassword(data, response) {
        const result = await this.user.resetPassword(
            data.code,
            data.newPassword
        );
        response(result);
    }

    async getFriends(userId, response) {
        const result = await this.user.getFriends(userId);
        response(result);
    }

    async getAllUsers(response) {
        const result = await this.user.getAllUsers();
        response(result);
    }

    async searchUser(searchTerm, response) {
        const result = await this.user.searchUser(searchTerm);
        response(result);
    }

    async sendFriendRequest(senderUsername, recipientUsername) {
        await this.user.sendFriendRequest(senderUsername, recipientUsername);
    }

    async followupStatus(senderUsername, recipientUsername, response) {
        const result = await this.user.followupStatus(
            senderUsername,
            recipientUsername
        );
        response(result);
    }

    async cancelFriendRequest(senderUsername, recipientUsername) {
        await this.user.cancelFriendRequest(senderUsername, recipientUsername);
    }

    async deleteFriend(username, friendUsername) {
        await this.user.deleteFriend(username, friendUsername);
    }

    async acceptRequest(username, reqUsername) {
        await this.user.acceptRequest(username, reqUsername);
    }

    async rejectRequest(username, reqUsername) {
        await this.user.rejectRequest(username, reqUsername);
    }

    async friendRequests(username, response) {
        const result = await this.user.friendRequests(username);
        response(result);
    }
}

module.exports = UserHandler;
