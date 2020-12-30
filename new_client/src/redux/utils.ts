import { auth } from './utils.firebase';

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