
import { ActionType } from '../root-reducer';
import userActionTypes, { userStateType } from './user.types';

type userReducerActionMapType = {
    [action: string]: (state: userStateType, payload?: unknown) => userStateType
}

type userPayloadActionTypeLoginType = {
    nickname: string,
    email: string
}

function isUserPayloadOfActionType(unknownTypePayload: unknown) {
    const payload = unknownTypePayload as userPayloadActionTypeLoginType;
    return (payload.nickname !== undefined && payload.email !== undefined);
}

const initialState = {
        nickname: "",
        email: ""
}

const userReducerActionMap : userReducerActionMapType = {
    [userActionTypes.LOGIN]: function reducerLogin(state, unknownPayload) {
        if (!isUserPayloadOfActionType(unknownPayload)) {
            return state;
        }

        const payload = unknownPayload as userPayloadActionTypeLoginType;

        return {
            ...state,
            email: payload.email,
            nickname: payload.nickname
        };
    },
    [userActionTypes.LOGOUT]: function reducerLogout() {
        return initialState;
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

    return newState;
}

export default userReducer;