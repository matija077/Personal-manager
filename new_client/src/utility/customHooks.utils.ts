import React, { useState, useEffect } from 'react';

/**
 * Custom Hook for using persisted storage in Function components
 * it uses useState for data storage and useEffect for side effects
 * useState - because useState intial value is computed on each re render
 * (even tough value is disregarded) we want to cache the funcion doing the
 * computation to run only on the first render. so we use argumetn less function
 * useEffect - it runs on each key or state changed.
 * so whenever we change the state, functio ncomponent will re render and then
 * useEffect will run and save newest state to the perissted storage. useEffect will also run if we change the key
 * but not the state to save onto persistedStorage with the newset key.
 * TODO How to handle key deletion fro mstorage
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

function useError() {
    var [error, setError] = useState<any>(null);

    return [error, setError];
}

function useLogger<T>(value: T) {
    useEffect(() => {
        console.log(value);
    }, [value]);
}

export {
    usePersistedStorage,
    useError,
    useLogger
}