import { useEffect, Dispatch, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
    logout as reduxLogout,
    silentLogin,
    silentRefreshStart,
    silentRefreshEnd
} from '../../redux/user-reducer/user.actions';
import { isRefreshInProcess } from '../../redux/user-reducer/user.selectors';
import {
    DocumentNode, useQuery,
    QueryResult
} from '@apollo/client';
import { GraphQLError } from 'graphql';
import { AxiosError, AxiosResponse } from 'axios';


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
    });
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
    const response = await apiWithCredentials.post("http://localhost:5012/api/auth/logout", {},
        {
            withCredentials: true,
            xsrfCookieName: 'XSRF-TOKEN',
            xsrfHeaderName: 'X-XSRF-TOKEN',
        });

    //axios.defaults.withCredentials = false;
}

function useIsSilentRefreshInProgress(): [boolean, () => void] {
    const [debounceTimer, setDebounceTimer] = useState<number>(0);
    const debounceTimerRef = useRef<boolean>(false);
    const firstTime = useRef<boolean>(true);

    useEffect(() => {
        function startDebounceTimer() {
            if (!firstTime && !debounceTimerRef) {
                setTimeout(() => {
                    debounceTimerRef
                }, 2000)
            }
        }
    }, [debounceTimerRef.current])

    const isSilentRefreshInProgress = useSelector(isRefreshInProcess);
    const isInProgress = debounceTimerRef.current || isSilentRefreshInProgress;

    return [isInProgress, startDebounceTimer];
}


// currently only docuemntNode allowed
type QueryType = DocumentNode;
type returnErrorType = {
    message: string;
    status: number | undefined;
};
function useQueryContainer<DataType>(query: QueryType) {
    //const { loading, error, data, networkStatus }:
    const {
        loading, data, error
    }: QueryResult = useQuery(query);
    //const result = useQuery(query)
    let unAuthOrForbiddenError = false;
    const dispatch = useDispatch();
    const [silentRefreshInProgress, startSilentRefreshDebounce] = useIsSilentRefreshInProgress();

    error?.graphQLErrors && error.graphQLErrors.forEach(
        (error: GraphQLError | returnErrorType) => {
            const customError = error as returnErrorType;
            if (customError.status !== undefined) {
                // TODO AUTH handle this differently
                if (customError.status === 401 && !silentRefreshInProgress) {
                    startSilentRefreshDebounce();
                    silentRefresh().
                        then(function resolved(result: AxiosResponse) {
                            dispatch(silentLogin({ ...result.data }));
                            // retry3
                        }).catch(function rejected(error: AxiosError) {
                            dispatch(reduxLogout());
                        })
                        .finally(function() {
                            dispatch(silentRefreshEnd());
                        });
                }
            } else {
                error as GraphQLError;
                // TODO ERROR - check GraphQLError later
            }
        }
    );
}
function useSilentRefresh(expiresIn: number, dispatch: Dispatch<any>) {
    const [silentRefreshInProgress, startSilentRefreshDebounce] = useIsSilentRefreshInProgress();

    useEffect(() => {
        console.log(silentRefreshInProgress);
        if (!expiresIn || silentRefreshInProgress) {
            return;
        }

        const silentRefreshTimeoutId = setTimeout(() => {
            startSilentRefreshDebounce();
            silentRefresh().
                then(function resolved(result: AxiosResponse) {
                    dispatch(silentLogin({ ...result.data }));
                }).catch(function rejected(error: AxiosError) {
                    dispatch(reduxLogout());
                })
                .finally(function() {
                    dispatch(silentRefreshEnd());
                });

                dispatch(silentRefreshStart());
        }, expiresIn * 1000);

        return () => {
            clearTimeout(silentRefreshTimeoutId);
        };
    });
}
function useInitialSilentRefresh(dispatch: Dispatch<any>) {
    const [silentRefreshInProgress, startSilentRefreshDebounce] = useIsSilentRefreshInProgress();

    useEffect(() => {
        if (silentRefreshInProgress) {
            return;
        }

        console.log("intiial");
        startSilentRefreshDebounce();
        silentRefresh().
            then(function resolved(result: AxiosResponse) {
                dispatch(silentLogin({ ...result.data }));
            }).catch(function rejected(error: AxiosError) {
                // go to login one day
            })
            .finally(function() {
                dispatch(silentRefreshEnd());
            });

        dispatch(silentRefreshStart());
    }, []);
}

export {
    useQueryContainer,
    useInitialSilentRefresh,
    useSilentRefresh,
    login,
    logout
}