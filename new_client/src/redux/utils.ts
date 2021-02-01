import { auth } from './utils.firebase';
import React from 'react';
import axios from 'axios';

function login(
    email: string,
    password: string
): any {
    console.log("login");

    return axios.post("http://localhost:5012/api/auth/authenticate", {
        id: 1,
        password
    })
    //return auth.signInWithEmailAndPassword(email, password)
}

export {
    login,
};