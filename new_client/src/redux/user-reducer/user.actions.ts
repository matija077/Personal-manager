import
    userActionTypes,
    {
        userPayloadActionTypeLoginType,
        actionReturnType,
        userPayloadActionTypeSilentLoginType
    }
from './user.types';

export function login({nickname, email, token, expiresIn}: userPayloadActionTypeLoginType):
    actionReturnType<typeof userActionTypes, userPayloadActionTypeLoginType> {
    return {
        type: userActionTypes.LOGIN,
        payload: {nickname, email, token, expiresIn}
    }
}

export function logout() {
    return {
        type: userActionTypes.LOGOUT,
        payload: undefined
    }
}

export function silentLogin({ expiresIn, token, nickname }: userPayloadActionTypeSilentLoginType):
    actionReturnType<typeof userActionTypes, userPayloadActionTypeSilentLoginType > {
    return {
            type: userActionTypes.SILENT_LOGIN,
            payload: {token, expiresIn, nickname}
        }
}