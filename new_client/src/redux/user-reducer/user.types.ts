export type userStateType = {
    nickname: string,
    email: string,
    token: string,
    expiresIn: string
}

export type userPayloadActionTypeLoginType = {
    nickname: string,
    email: string,
    token: string,
    expiresIn: string
}

export type userPayloadActionTypeSilentLoginType = {
    token: string,
    expiresIn: string
}

// TODO move this to a redux types file
export type actionReturnType<T, payloadType> = {
    type:  T[keyof T],
    payload: payloadType
}

export function isUserPayloadOfActionType(unknownTypePayload: unknown) {
    const payload = unknownTypePayload as userPayloadActionTypeLoginType;
    return (payload.nickname !== undefined && payload.email !== undefined);
}

const userActionTypes = {
    "LOGIN": "LOGIN",
    "LOGOUT": "LOGOUT",
    "SILENT_LOGIN": "SILENT_LOGIN"
}

export default userActionTypes;