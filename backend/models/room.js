const { auth, db } = require("../firebase/firebase");
const FirebaseErrorHandler = require("../firebase/firebase_errors");
const { collection, query, where, getDocs } = require("firebase/firestore");

class Room {
    constructor() {
        this.auth = auth;
        this.db = db;
    }
    async getRooms(memberId) {
        const roomsRef = collection(this.db, "rooms");
        const q = await query(
            roomsRef,
            where("members", "array-contains", memberId)
        );
        const docs = [];
        await getDocs(q).then(querySnapshot => {
            querySnapshot.forEach(doc => {
                docs.push({
                    room_id: doc.id,
                    ...doc.data()
                });
            });
        });

        return docs;
    }
    save(name, members) {}
}

module.exports = Room;
