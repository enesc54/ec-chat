var { initializeApp } = require("firebase/app");
var { getAuth } = require("firebase/auth");
var { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyDGI5BwBjsYQIHNgpUyuB-PlgUwyqIpv7k",
    authDomain: "ec-chat-ed820.firebaseapp.com",
    databaseURL: "https://ec-chat-ed820-default-rtdb.firebaseio.com",
    projectId: "ec-chat-ed820",
    storageBucket: "ec-chat-ed820.appspot.com",
    messagingSenderId: "312266591356",
    appId: "1:312266591356:web:98e1688fb81e8884678df9",
    measurementId: "G-XMCHPCQ34C"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

module.exports = {
    auth,
    db
};
