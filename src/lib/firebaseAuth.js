import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebaseConfig';

export const loginWithEmail = (email, password) => {

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);


        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });
}