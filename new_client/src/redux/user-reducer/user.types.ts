export type userStateType = {
    nickname: string,
    email: string,
    token: string
}

export type userPayloadActionTypeLoginType = {
    nickname: string,
    email: string,
    token: string
}

export function isUserPayloadOfActionType(unknownTypePayload: unknown) {
    const payload = unknownTypePayload as userPayloadActionTypeLoginType;
    return (payload.nickname !== undefined && payload.email !== undefined);
}

const userActionTypes = {
    "LOGIN": "LOGIN",
    "LOGOUT": "LOGOUT"
}

export default userActionTypes;