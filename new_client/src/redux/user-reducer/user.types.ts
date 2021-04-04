export type userStateType = {
    nickname: string,
    email: string,
    token: string,
    expiresIn: string,
    refreshInProcess: boolean
}

export type userPayloadActionTypeLoginType = {
    nickname: string,
    email: string,
    token: string,
    expiresIn: string
}
export type userPayloadActionTypeSilentLoginType = Omit<userPayloadActionTypeLoginType, "email">;

export type userPayloadType =
    userPayloadActionTypeLoginType |
    userPayloadActionTypeSilentLoginType;

// TODO move this to a redux types file
export type actionReturnType<T, payloadType> = {
    type:  T[keyof T],
    payload?: payloadType
}

export function isUserPayloadOfActionType(unknownTypePayload: unknown) {
    const payload = unknownTypePayload as userPayloadActionTypeLoginType;
    return (payload.nickname !== undefined && payload.email !== undefined);
}

const userActionTypes = {
    "LOGIN": "LOGIN",
    "LOGOUT": "LOGOUT",
    "SILENT_LOGIN": "SILENT_LOGIN",
    "SILENT_REFRESH_START": "SILENT_REFRESH_START"
}

export default userActionTypes;