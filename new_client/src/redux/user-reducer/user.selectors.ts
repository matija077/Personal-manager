import { RootState } from '../root-reducer';

export function getUser(state: RootState) {
    return state.user;
}