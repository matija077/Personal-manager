import userActionTypes from './user.types';

export function login({nickname, email}: {nickname: string, email: string}) {
    return {
        type: userActionTypes.LOGIN,
        payload: {nickname, email}
    }
}

export function logout() {
    return {
        type: userActionTypes.LOGOUT,
        payload: undefined
    }
}