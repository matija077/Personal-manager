import { RootState } from '../root-reducer';
import { userStateType } from './user.types';

export function getUser(state: RootState) {
    return state.user;
}

export function getExpiresIn(state: RootState) {
    return getUser(state).expiresIn;
}

export function isRefreshInProcess(state: RootState) {
    return getUser(state).refreshInProcess
}