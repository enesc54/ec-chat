var { initializeApp } = require("firebase/app");
var { getAuth } = require("firebase/auth");
var { getFirestore } = require("firebase/firestore");
var { getStorage }  =  require("firebase/storage")

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app, process.env.FIREBASE_STORAGE_URL)

module.exports = {
    auth,
    db,storage
};
