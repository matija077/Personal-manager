import { RootState } from '../root-reducer';
import { userStateType } from './user.types';

export function getUser(state: RootState) {
    return state.user;
}