
import { ActionType } from '../root-reducer';
import userActionTypes, { userStateType, userPayloadActionTypeLoginType } from './user.types';

type userReducerActionMapType = {
    [action: string]: (state: userStateType, payload?: unknown) => userStateType
}

const initialState: userStateType = {
        nickname: "",
        email: "",
        token: "",
        expiresIn: ""
}

const userReducerActionMap : userReducerActionMapType = {
    [userActionTypes.LOGIN]: function reducerLogin(state, unknownPayload) {
        const payload = unknownPayload as userPayloadActionTypeLoginType;

        return {
            ...state,
            email: payload.email,
            nickname: payload.nickname,
            token: payload.token,
            expiresIn: payload.expiresIn
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