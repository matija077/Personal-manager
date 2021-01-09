import { auth } from './utils.firebase';
import React from 'react';

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