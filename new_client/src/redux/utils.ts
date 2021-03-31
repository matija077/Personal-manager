import { auth } from './utils.firebase';
import React from 'react';
import axios from 'axios';
import { getExpiresIn } from './user-reducer/user.selectors';
import {  useSelector } from 'react-redux';

const apiWithoutCredentials = axios.create({
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
});
const apiWithCredentials = axios.create({
    withCredentials: true,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
});


function login(
    email: string,
    password: string
): any {
    return apiWithCredentials.post("http://localhost:5012/api/auth/authenticate", {
        email: email,
        password,
    })
}

async function silentRefresh() {
    //axios.defaults.withCredentials = true;

    const response = await apiWithCredentials.post("http://localhost:5012/api/auth/refreshToken");

    //axios.defaults.withCredentials = false;

    if (response.status === 200) {
        return response;
    }

    return Promise.reject(response);
}

async function logout() {
    //axios.defaults.withCredentials = true;

    const response = await apiWithCredentials.post("http://localhost:5012/api/auth/logout", {
    },
    {
        withCredentials: true,
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN',
    });

    //axios.defaults.withCredentials = false;
}

export {
    login,
    silentRefresh
};