import userActionTypes, { userPayloadActionTypeLoginType,  actionReturnType} from './user.types';

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