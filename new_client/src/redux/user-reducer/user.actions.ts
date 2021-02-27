import userActionTypes from './user.types';

export function login({nickname, email, token}: {nickname: string, email: string, token: string}) {
    return {
        type: userActionTypes.LOGIN,
        payload: {nickname, email, token}
    }
}

export function logout() {
    return {
        type: userActionTypes.LOGOUT,
        payload: undefined
    }
}