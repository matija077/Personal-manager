export enum tokenEnum  {
    TOKEN_SECRET = "TOKEN_SECRET",
    REFRESH_TOKEN_SECRET = "REFRESH_TOKEN_SECRET"
}

export enum tokenExpiresEnum {
    TOKEN_EXPIRES_SECONDS = "TOKEN_EXPIRES_SECONDS",
    REFRESH_TOKEN_EXPIRES_SECONDS = "REFRESH_TOKEN_EXPIRES_SECONDS"
}

export const defaultExpires: {
    [key in tokenExpiresEnum]: string
} = {
    [tokenExpiresEnum.TOKEN_EXPIRES_SECONDS]:  "300",
    [tokenExpiresEnum.REFRESH_TOKEN_EXPIRES_SECONDS]: "604800"
}

export const REFRESH_TOKEN = "refreshToken";