const { auth, db } = require("../firebase/firebase");
const FirebaseErrorHandler = require("../firebase/firebase_errors");

const {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    confirmPasswordReset
} = require("firebase/auth");
const {
    setDoc,
    doc,
    getDoc,
    getDocs,
    collection,
    query,
    where,
    updateDoc
} = require("firebase/firestore");

module.exports = class User {
    constructor() {
        this.auth = auth;
        this.db = db;
    }
    async create(email, password, userData) {
        var result;
        await createUserWithEmailAndPassword(this.auth, email, password)
            .then(async userCredential => {
                const { localId: userId } = userCredential.user.reloadUserInfo;
                setDoc(
                    doc(this.db, "users", userCredential.user.uid),
                    userData
                );
                await getDoc(doc(collection(this.db, "users"), userId)).then(
                    user => {
                        result = {
                            status: 200,
                            currentUser: {
                                userId,
                                username: user.data().username,
                                fullname: user.data().fullname,
                                ...this.auth.currentUser.providerData[0]
                            },
                            message: "Kayıt başarılı..."
                        };
                    }
                );
            })
            .catch(e => {
                result = FirebaseErrorHandler(e);
            });
        return result;
    }

    async login(email, password) {
        var result;
        await signInWithEmailAndPassword(this.auth, email, password)
            .then(async userCredential => {
                const { localId: userId } = userCredential.user.reloadUserInfo;

                await getDoc(doc(collection(this.db, "users"), userId)).then(
                    user => {
                        result = {
                            status: 200,
                            currentUser: {
                                userId,
                                username: user.data().username,
                                fullname: user.data().fullname,
                                ...this.auth.currentUser.providerData[0]
                            },
                            message: "Giriş başarılı..."
                        };
                    }
                );
            })
            .catch(e => {
                result = FirebaseErrorHandler(e);
            });
        return result;
    }

    async sendResetPasswordEmail(email) {
        var result;
        await sendPasswordResetEmail(this.auth, email)
            .then(() => {
                result = {
                    status: 200,
                    message:
                        "Şifre sıfırlamak için email gönderildi. Lütfen gelen kutunuzu kontrol ediniz..."
                };
            })
            .catch(e => {
                console.error(e);
                result = FirebaseErrorHandler(e);
            });

        return result;
    }

    async resetPassword(code, newPassword) {
        var result;
        
        await confirmPasswordReset(this.auth, code, newPassword)
            .then(() => {
                result = {
                    status: 200,
                    message: "Şifre sıfırlama başarılı..."
                };
            })
            .catch(e => {
                result = FirebaseErrorHandler(e);
            });
        return result;
    }

    async getFriends(userId) {
        var result;
        const userRef = doc(collection(this.db, "users"), userId);

        await getDoc(userRef).then(user => {
            result = user.data().friends;
        });

        return result;
    }

    async searchUser(searchTerm) {
        var result = [];
        const usersRef = collection(this.db, "users");

        await getDocs(usersRef).then(snapshot => {
            snapshot.forEach(user => {
                if (
                    searchTerm &&
                    user
                        .data()
                        .username.toLowerCase()
                        .includes(searchTerm.toLowerCase())
                ) {
                    result.push({
                        name: user.data().fullname,
                        username: user.data().username,
                        profilePhoto: user.data().profilePhoto
                    });
                }
            });
        });
        return result;
    }

    async getUserProfile(username) {
        var result;

        const usersRef = collection(this.db, "users");

        const q = await query(usersRef, where("username", "==", username));

        await getDocs(q).then(querySnapshot => {
            querySnapshot.forEach(user => {
                result = {
                    username: user.data().username,
                    fullname: user.data().fullname,
                    profilePhoto: user.data().profilePhoto
                };
            });
        });

        return result;
    }

    async sendFriendRequest(senderUsername, recipientUsername) {
        const usersRef = collection(this.db, "users");

        const q = await query(
            usersRef,
            where("username", "==", recipientUsername)
        );

        await getDocs(q).then(querySnapshot => {
            querySnapshot.forEach(user => {
                var userFriendRequests = user.data().friendRequests
                    ? user.data().friendRequests
                    : [];
                if (!user.data().friendRequests?.includes(senderUsername)) {
                    updateDoc(user.ref, {
                        friendRequests: [...userFriendRequests, senderUsername]
                    });
                }
            });
        });
    }

    async followupStatus(senderUsername, recipientUsername) {
        var result;
        const usersRef = collection(this.db, "users");

        const q = await query(
            usersRef,
            where("username", "==", recipientUsername)
        );

        await getDocs(q).then(querySnapshot => {
            querySnapshot.forEach(user => {
                if (user.data().friends?.includes(senderUsername))
                    result = "friend";
                else if (user.data().friendRequests?.includes(senderUsername))
                    result = "request";
                else result = "none";
            });
        });
        return result;
    }

    async cancelFriendRequest(senderUsername, recipientUsername) {
        const usersRef = collection(this.db, "users");

        const q = await query(
            usersRef,
            where("username", "==", recipientUsername)
        );

        await getDocs(q).then(querySnapshot => {
            querySnapshot.forEach(user => {
                var userFriendRequests = user.data().friendRequests
                    ? user.data().friendRequests
                    : [];
                if (user.data().friendRequests?.includes(senderUsername)) {
                    userFriendRequests.splice(
                        userFriendRequests.indexOf(senderUsername),
                        1
                    );
                    updateDoc(user.ref, {
                        friendRequests: [...userFriendRequests]
                    });
                }
            });
        });
    }

    async deleteFriend(username, friendUsername) {
        const usersRef = collection(this.db, "users");

        const q1 = await query(usersRef, where("username", "==", username));

        await getDocs(q1).then(querySnapshot => {
            querySnapshot.forEach(user => {
                var userFriends = user.data().friends
                    ? user.data().friends
                    : [];

                
                if (user.data().friends?.includes(friendUsername)) {
                    userFriends.splice(userFriends.indexOf(friendUsername), 1);
                    updateDoc(user.ref, {
                        friends: [...userFriends]
                    });
                }
            });
        });

        const q2 = await query(
            usersRef,
            where("username", "==", friendUsername)
        );

        await getDocs(q2).then(querySnapshot => {
            querySnapshot.forEach(user => {
                var userFriends = user.data().friends
                    ? user.data().friends
                    : [];

                
                if (user.data().friends?.includes(username)) {
                    userFriends.splice(userFriends.indexOf(username), 1);
                    updateDoc(user.ref, {
                        friends: [...userFriends]
                    });
                }
            });
        });
    }

    async friendRequests(username) {
        var result = [];

        const usersRef = collection(this.db, "users");

        const q = await query(usersRef, where("username", "==", username));

        const querySnapshot = await getDocs(q);
        for (const user of querySnapshot.docs) {
            if (user.data().friendRequests) {
                for (const friend of user.data().friendRequests) {
                    const q = await query(
                        usersRef,
                        where("username", "==", friend)
                    );

                    await getDocs(q).then(querySnapshot => {
                        querySnapshot.forEach(user => {
                            result.push({
                                username: user.data().username,
                                fullname: user.data().fullname,
                                profilePhoto: user.data().profilePhoto
                            });
                        });
                    });
                }
            }
        }
        return result;
    }

    async acceptRequest(username, reqUsername) {
        
        const usersRef = collection(this.db, "users");

        const q1 = await query(usersRef, where("username", "==", username));

        await getDocs(q1).then(querySnapshot => {
            querySnapshot.forEach(user => {
                var userFriends = user.data().friends
                    ? user.data().friends
                    : [];

                var userFriendRequests = user.data().friendRequests;
                userFriendRequests.splice(
                    userFriendRequests.indexOf(reqUsername),
                    1
                );
                if (!user.data().friends?.includes(reqUsername)) {
                    updateDoc(user.ref, {
                        friendRequests: [...userFriendRequests],
                        friends: [...userFriends, reqUsername]
                    });
                }
            });
        });

        const q2 = await query(usersRef, where("username", "==", reqUsername));

        await getDocs(q2).then(querySnapshot => {
            querySnapshot.forEach(user => {
                var userFriends = user.data().friends
                    ? user.data().friends
                    : [];

                if (!user.data().friends?.includes(username)) {
                    updateDoc(user.ref, {
                        friends: [...userFriends, username]
                    });
                }
            });
        });
    }
    async rejectRequest(username, reqUsename) {
        const usersRef = collection(this.db, "users");

        const q = await query(usersRef, where("username", "==", username));

        await getDocs(q).then(querySnapshot => {
            querySnapshot.forEach(user => {
                var userFriendRequests = user.data().friendRequests
                    ? user.data().friendRequests
                    : [];
                if (user.data().friendRequests?.includes(reqUsename)) {
                    userFriendRequests.splice(
                        userFriendRequests.indexOf(reqUsename),
                        1
                    );
                    updateDoc(user.ref, {
                        friendRequests: [...userFriendRequests]
                    });
                }
            });
        });
    }
};
