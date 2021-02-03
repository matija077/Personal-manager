import { RootState } from '../root-reducer';
import { userStateType } from './user.types';

var userMemo = {} as userStateType;

export function getUser(state: RootState) {
    //console.log("i have run");
    if (state.user === userMemo) {
        return userMemo;
    }

    userMemo = state.user;
    return state.user;
}