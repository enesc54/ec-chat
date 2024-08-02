const { auth, db, storage } = require("../firebase/firebase");
const FirebaseErrorHandler = require("../firebase/firebase_errors");
const {
    collection,
    query,
    where,
    getDocs,
    addDoc
} = require("firebase/firestore");

const {
    ref,
    uploadBytesResumable,
    getDownloadURL
} = require("firebase/storage");

class Room {
    constructor() {
        this.auth = auth;
        this.db = db;
        this.storage = storage;
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
    async save(roomData) {
        var roomImgUrl;
        if (roomData.roomImg !== null) {
            const roomImgRef = ref(
                this.storage,
                `roomImages/${roomData.roomImg.fileName}`
            );

            const uploadTask = uploadBytesResumable(
                roomImgRef,
                roomData.roomImg.fileData
            );

            await uploadTask.on(
                "state_changed",
                snapshot => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                },
                error => {
                    console.error("Upload failed", error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        downloadURL => {
                            addDoc(collection(this.db, "rooms"), {
                                name: roomData.name,
                                members: roomData.members,
                                roomImg: downloadURL
                            });
                        }
                    );
                }
            );
        } else {
            addDoc(collection(this.db, "rooms"), {
                name: roomData.name,
                members: roomData.members,
                roomImg: null
            });
        }
    }
}

module.exports = Room;
