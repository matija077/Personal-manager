
import { ActionType } from '../root-reducer';
import
    userActionTypes,
    {
        userStateType,
        userPayloadActionTypeLoginType,
        userPayloadActionTypeSilentLoginType,
        userPayloadType
    }
from './user.types';

type userReducerActionMapType = {
    [action: string]: (state: userStateType, payload?: userPayloadType) => userStateType
}

const initialState: userStateType = {
        nickname: "",
        email: "",
        token: "",
        expiresIn: "",
        refreshInProcess: false
}

const userReducerActionMap : userReducerActionMapType = {
    [userActionTypes.LOGIN]: function reducerLogin(state, userPayload) {
        const payload = userPayload as userPayloadActionTypeLoginType;

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
    },
    [userActionTypes.SILENT_LOGIN]: function reducerSilentLogin(state, userPayload) {
        const payload = userPayload as userPayloadActionTypeSilentLoginType;

        return {
            ...state,
            token: payload.token,
            expiresIn: payload.expiresIn,
            nickname: payload.nickname
        };
    },
    [userActionTypes.SILENT_REFRESH_START]: function reducerSilentRefreshStart(state) {
        return {
            ...state,
            refreshInProcess: true
        }
    },
    [userActionTypes.SILENT_REFRESH_END]: function reducerSilentRefreshEnd(state) {
        return {
            ...state,
            refreshInProcess: false
        }
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