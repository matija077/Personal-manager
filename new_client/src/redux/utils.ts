import { auth } from './utils.firebase';
import React from 'react';

function login(
    email: string,
    password: string
): any {
    console.log("login");

    return auth.signInWithEmailAndPassword(email, password)
}

function usePersistedStorage(key: string, defaultValue: unknown): [unknown, Function] {
    const [state, setState] = React.useState(() => {
        const persistedState = localStorage.getItem(key);
        return persistedState ? JSON.parse(persistedState) : defaultValue;
    });

    React.useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state))
        console.log(state);
    }, [state, key])

    return [state, setState];
}

export {
    login,
    usePersistedStorage
};