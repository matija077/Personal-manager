import jwt from 'jsonwebtoken';
import { tokenEnum, REFRESH_TOKEN } from './types';
import parseCookies from '../services/cookie.service';



function getToken(authHeader: string | undefined) {
    let token: string | null = null;

    if (authHeader) {
        // first part is Bearer. second part is the token
        token = authHeader.split(' ')[1];
    }

    return token
}

function getRefreshToken(cookie: string | undefined) {
    let token: string | null = null;

    if (cookie) {
        token = parseCookies(REFRESH_TOKEN, cookie);
    }

    return token;
}

function verifyToken(
    token: string,
    secretType: tokenEnum,
    authenticated: () => void,
    unauthorized: () => void)
{
    jwt.verify(token, process.env[secretType] as string, (error, payload) => {
        if (error) {
            unauthorized()
        }

        authenticated();
    })
}

export {
    getToken,
    verifyToken,
    getRefreshToken
}