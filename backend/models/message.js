const { auth, db } = require("../firebase");
const FirebaseErrorHandler = require("../firebase/firebase_errors");
const {
    collection,
    doc,
    onSnapshot,
    setDoc,
    query,
    orderBy,
    Timestamp
} = require("firebase/firestore");

class Message {
    constructor() {
        this.auth = auth;
        this.db = db;
    }
    async getMessages(roomId, socket) {
        const messagesRef = collection(
            doc(collection(this.db, `rooms`), roomId),
            "messages"
        );

        const q = query(messagesRef, orderBy("timeStamp", "desc"));

        await onSnapshot(q, snapshot => {
            socket.emit(
                `${roomId}`,
                snapshot.docs.map(doc => {
                    return {
                        ...doc.data(),
                        id: doc.id,
                        timeStamp: new Date(
                            doc.data().timeStamp?.toDate().toLocaleString("tr")
                        )
                    };
                })
            );
        });
    }

    async sendMessage(roomId, messageData) {
        messageData.timeStamp = Timestamp.fromDate(
            new Date(messageData.timeStamp)
        );
        const messagesRef = doc(
            collection(doc(collection(this.db, `rooms`), roomId), "messages")
        );

        await setDoc(messagesRef, messageData);
    }
}

module.exports = Message;
