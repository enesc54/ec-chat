const { auth, db } = require("../firebase/firebase");
const FirebaseErrorHandler = require("../firebase/firebase_errors");

const {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    confirmPasswordReset
} = require("firebase/auth");
const { setDoc, doc } = require("firebase/firestore");

module.exports = class User {
    constructor() {
        this.auth = auth;
        this.db = db;
    }
    async create(email, password, userData) {
        var result;
        await createUserWithEmailAndPassword(this.auth, email, password)
        
                
            .then(userCredential => {
              const { localId: userId } = userCredential.user.reloadUserInfo;
                setDoc(doc(db, "users", userCredential.user.uid), userData);
                result = {
                    status: 200,
                    currentUser:  {
                        userId,
                        ...this.auth.currentUser.providerData[0]
                    },
                    message: "Kayıt başarılı..."
                };
            })
            .catch(e => {
                result = FirebaseErrorHandler(e);
            });
        return result;
    }
    async login(email, password) {
        var result;
        await signInWithEmailAndPassword(this.auth, email, password)
            .then(userCredential => {
                const { localId: userId } = userCredential.user.reloadUserInfo;
                
                result = {
                    status: 200,
                    currentUser: {
                        userId,
                        ...this.auth.currentUser.providerData[0]
                    },
                    message: "Giriş başarılı..."
                };
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
        console.log(code, newPassword);
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
};
