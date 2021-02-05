import { auth } from './utils.firebase';
import React from 'react';
import axios from 'axios';

function login(
    email: string,
    password: string
): any {
    return axios.post("http://localhost:5012/api/auth/authenticate", {
        email: email,
        password
    })
    //return auth.signInWithEmailAndPassword(email, password)
}

export {
    login,
};