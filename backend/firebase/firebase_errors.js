function FirebaseErrorHandler(e) {
    const errorCode = e.code;
    switch (errorCode) {
        case "auth/weak-password":
            return {
                status: 400,
                code: "weak-password",
                message: "Şifre en az 6 haneli olmalı..."
            };
            break;

        case "auth/email-already-in-use":
            return {
                status: 400,
                code: "email-already-in-use",
                message: "Bu email hesabı zaten kullanılıyor..."
            };
            break;

        case "auth/invalid-email":
            return {
                status: 400,
                code: "invalid-email",
                message: "Lütfen geçerli bir email giriniz..."
            };
            break;

        case "auth/invalid-credential":
            return {
                status: 400,
                code: "invalid-credential",
                message: "Email veya şifre hatalı..."
            };

        case "auth/missing-password":
            return {
                status: 400,
                code: "missing-password",
                message: "Lütfen şifre giriniz..."
            };

        case "auth/missing-email":
            return {
                status: 400,
                code: "missing-password",
                message: "Lütfen email giriniz..."
            };

        case "auth/too-many-requests":
            return {
                status: 400,
                code: "too-many-requests",
                message:
                    "Bu hesap için çok fazla hatalı deneme yapıldığı için hesaba erişim geçici süre engellendi. Hesabınıza erişebilmek için şifrenizi sıfırlayınız."
            };

        default:
            console.log(e);
    }
}

module.exports = FirebaseErrorHandler;
