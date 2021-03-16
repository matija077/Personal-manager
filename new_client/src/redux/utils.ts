import { auth } from './utils.firebase';
import React from 'react';
import axios from 'axios';

function login(
    email: string,
    password: string
): any {
    return axios.post("http://localhost:5012/api/auth/authenticate", {
        email: email,
        password,
    },
    {
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6Im1hdGlqYSIsImlhdCI6MTYxMjYwOTUxNywiZXhwIjoxNjEyNzgyMzE3fQ.rD3n1vwDQVWoA59Gmj292dqyo3MMIxZkamss-_bYR9k`
        }
    })
    //return auth.signInWithEmailAndPassword(email, password)
}

function silentRefresh() {
    axios.defaults.withCredentials = true;
    axios.post("http://localhost:5012/api/auth/refreshToken", {
    },
    {
        withCredentials: true,
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN',
    });
    /*fetch("http://localhost:5012/api/auth/refreshToken",
    {
        method: "POST",
        credentials: 'include'
    })*/
}

export {
    login,
    silentRefresh
};