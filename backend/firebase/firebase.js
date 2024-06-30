var { initializeApp } = require("firebase/app");
var { getAuth } = require("firebase/auth");
var { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyBWvFTSL1sQHo2YHsqKwl1PJAldPEjC4SY",
    authDomain: "ec-chat-test.firebaseapp.com",
    databaseURL: "https://ec-chat-test-default-rtdb.firebaseio.com",
    projectId: "ec-chat-test",
    storageBucket: "ec-chat-test.appspot.com",
    messagingSenderId: "104446720788",
    appId: "1:104446720788:web:570c179a9937d35d606001"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

module.exports = {
    auth,
    db
};
