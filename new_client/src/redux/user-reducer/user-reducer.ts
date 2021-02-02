
import { ActionType } from '../root-reducer';
import userActionTypes, { userStateType } from './user.types';

type userReducerActionMapType = {
    [action: string]: (state: userStateType, payload?: unknown) => userStateType
}

type userPayloadActionTypeLoginType = {
    nickname: string,
    email: string
}

function isUserPayloadActionTypeLogin(unknownPayload: unknown) {
    const payload = unknownPayload as userPayloadActionTypeLoginType;
    return (payload.nickname !== undefined && payload.email !== undefined);
}

const initialState = {
    user: {
        nickname: "",
        email: ""
    }
}

const userReducerActionMap : userReducerActionMapType = {
    [userActionTypes.LOGIN]: function(state, unknownPayload) {
        console.log(unknownPayload);
        if (!isUserPayloadActionTypeLogin(unknownPayload)) {
            return state;
        }
        console.log("working");

        const payload = unknownPayload as userPayloadActionTypeLoginType;

        return {
            ...state,
            email: payload.email,
            nickname: payload.nickname
        };
    }
}

function userReducer(
    state: userStateType = initialState,
    action: ActionType
): userStateType {
    var newState = userReducerActionMap[action.type] ?
        userReducerActionMap[action.type](state, action.payload)
    :
        state;

    return state;
}

export default userReducer;