import React, { useState, useEffect, useMemo, useLayoutEffect, useRef, Dispatch } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { logout, silentLogin} from '../../redux/user-reducer/user.actions';
import { getExpiresIn } from '../../redux/user-reducer/user.selectors';
import { silentRefresh } from '../../redux/utils';

import { ApolloError,
    DocumentNode,
    useMutation,
    useQuery,
    QueryResult
} from '@apollo/client';
import { GraphQLError } from 'graphql';
import { AxiosError, AxiosResponse } from 'axios';

type storageType = typeof localStorage | typeof sessionStorage;

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
    callbackFunctionsCleanUpArray: (Function)[],
    storageType: storageType)
: [T, Function] {
    const [state, setState] = React.useState(() => {
        const persistedState = storageType.getItem(key);
        return persistedState ? JSON.parse(persistedState) : defaultValue;
    });

    React.useEffect(() => {
        callbackFunctionsArray.forEach(function(func) {
            func();
        })

        storageType.setItem(key, JSON.stringify(state))

        return () => {
            callbackFunctionsCleanUpArray.forEach(function(func) {
                func();
            });
        }
    }, [state, key])

    return [state, setState];
}

function useError() {
    var [error, setError] = useState<any>(undefined);

    if (error) {
        throw error;
    }

    return [error, setError];
}

function useLogger<T>(message: string = "", value: T) {
    useEffect(() => {
        console.log(`logger -> ${message} : ${value}`);
    }, [value]);
}

/*
* for skipping queries if we want lo load it only once
*/
function useUseQueryHook({loading, data, ref}:
    {loading: boolean, data: any, ref: React.MutableRefObject<boolean>}) {
    useEffect(() => {
        if (!loading && data) {
            ref.current = true;
        }
    }, [data, loading])
}

function useConsoleLogQueries(
    loading: boolean, error: any, data: any, name: string) {
    useEffect(() => {
        if (loading) {
            console.log(`${name} loading`);
        } else if (error) {
            console.error(error);
        } else {
            console.log(`${name} --->`);
            console.log(data);
        }
    }, [loading, data, error, name])
}

// currently only docuemntNode allowed
type QueryType = DocumentNode
type returnErrorType = {
    message: string,
    status: number | undefined
}
function useQueryContainer<DataType>(query: QueryType) {
    //const { loading, error, data, networkStatus }:
    const {
        loading, data, error
    } : QueryResult = useQuery(query);
    //const result = useQuery(query)

    let unAuthOrForbiddenError = false;
    const dispatch = useDispatch();

    error?.graphQLErrors && error.graphQLErrors.forEach(
        (error: GraphQLError | returnErrorType) => {
            const customError = error as returnErrorType;
            if (customError.status !== undefined) {
                // TODO AUTH handle this differently
                if (customError.status === 401 || customError.status === 403) {
                    unAuthOrForbiddenError = true;
                }
            } else {
                error as GraphQLError;
                // TODO ERROR - check GraphQLError later
            }
        }
    )

    useEffect(() => {
        if (unAuthOrForbiddenError) {
            dispatch(logout());
        }
    }, [unAuthOrForbiddenError, dispatch])
}

function useSilentRefresh(expiresIn: number, dispatch: Dispatch<any>){
    useEffect(() => {
        const silentRefreshTimeoutId = setTimeout(() => {
            silentRefresh().
                then(function resolved(result: AxiosResponse) {
                    dispatch(silentLogin({...result.data}))
                }).catch(function rejected(error: AxiosError) {
                    //dispatch(logout());
                });
        }, expiresIn*1000);

        return () => {
            clearTimeout(silentRefreshTimeoutId);
        }
    }, [expiresIn, dispatch])
}

export {
    usePersistedStorage,
    useError,
    useLogger,
    useUseQueryHook,
    useConsoleLogQueries,
    useQueryContainer,
    useSilentRefresh
}