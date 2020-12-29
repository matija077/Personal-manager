import {auth, googleProvider} from './utils.firebase';

type loginReturnType = {
    success: Boolean,
    userName: string
};

function login(
    email: string,
    password: string
): any {
    console.log("login");

    return auth.signInWithEmailAndPassword(email, password)
}

export {
    login,
};