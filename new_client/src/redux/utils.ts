import { auth } from './utils.firebase';
import React from 'react';

function login(
    email: string,
    password: string
): any {
    console.log("login");

    return auth.signInWithEmailAndPassword(email, password)
}
/**
 *
 * @param key
 * @param defaultValue
 * @param callbackFunctionsArray
 * @param callbackFunctionsCleanUpArray
 * @returns [T, function]
 */
function usePersistedStorage<T>(
    key: string,
    defaultValue: T,
    callbackFunctionsArray: (Function)[],
    callbackFunctionsCleanUpArray: (Function)[])
: [T, Function] {
    const [state, setState] = React.useState(() => {
        const persistedState = localStorage.getItem(key);
        return persistedState ? JSON.parse(persistedState) : defaultValue;
    });

    React.useEffect(() => {
        callbackFunctionsArray.forEach(function(func) {
            func();
        })

        localStorage.setItem(key, JSON.stringify(state))
        console.log(state);

        return () => {
            callbackFunctionsCleanUpArray.forEach(function(func) {
                func();
            });
        }
    }, [state, key])

    return [state, setState];
}

export {
    login,
    usePersistedStorage
};