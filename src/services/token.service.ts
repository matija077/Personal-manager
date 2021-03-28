import jwt from 'jsonwebtoken';
import { nextTick } from 'process';
import { tokenEnum, tokenExpiresEnum, defaultExpires } from '../utility/types';

export type createTokenReturnType = {
    token: string,
    expiresIn: string,
    options?: Record<string, any>
}
/**
 * tokenSecret and okenExpires are enums corespomnding to either access or refresh token
 * for expiresIn we use customOne, env, defautl i mnthat order. customIn is need for
 * refreshToken refreshing for example
 */
async function createToken({
    nickname,
    tokenSecret,
    tokenExpires,
    options = {},
    customExpires
}: {
    nickname: string,
    tokenSecret: tokenEnum,
    tokenExpires: tokenExpiresEnum,
    options?: jwt.SignOptions,
    customExpires?: string
}): Promise<createTokenReturnType> {
    const expiresIn = customExpires || (process.env[tokenExpires] || defaultExpires[tokenExpires]);

    const token = await signToken(
        {nickname},
        tokenEnum[tokenSecret],
        {
            ...options,
            expiresIn: parseInt(expiresIn)
        }
    );

    return {
        token,
        expiresIn
    }
}

type createAccessTokenType = createTokenReturnType;
async function createAccessToken(nickname: string): Promise<createAccessTokenType> {
    return await createToken({
        nickname,
        tokenSecret: tokenEnum.TOKEN_SECRET,
        tokenExpires: tokenExpiresEnum.TOKEN_EXPIRES_SECONDS
    })
}

interface createRefreshTokenType extends createTokenReturnType {
    options: {
        jwtid: string
    }
}
/**
 * for storing refresh token itn doatabase we need to return jwtid.
 * we can accomplish correct ytpes by using itnefaces and extends
 */
async function createRefreshToken(nickname: string, expiresIn?: string): Promise<createRefreshTokenType> {
    const jwtid = (Math.random()*(Math.random()*1000)).toString();

    const createTokenResult = await createToken({
        nickname,
        tokenSecret: tokenEnum.REFRESH_TOKEN_SECRET,
        tokenExpires: tokenExpiresEnum.REFRESH_TOKEN_EXPIRES_SECONDS,
        options: {
            jwtid
        },
        customExpires: expiresIn
    });

    const createRefreshTokenResult: createRefreshTokenType = {
        ...createTokenResult,
        options: {
            jwtid
        }
    }

    return createRefreshTokenResult;
}

// expiresIn - number - seconds, string - milliseconds
/**
 * if we doo async it wil lread key asynconosly. doenst really matter
 * expriesIn is expected in seocnds/mislsiceodns remaining.
 */
async function signToken(data: string | object | Buffer, secretType: tokenEnum, options: jwt.SignOptions = {}) {
    try {
        const token: string = await new Promise(function (resolve, reject) {
            jwt.sign(
                data,
                process.env[secretType] as string,
                options,
                function(err: Error | null, token: string | undefined) {
                    if (token) {
                        resolve(token);
                    }

                    reject(err);
                }
            )
        })

        return token;
    } catch(error) {
        throw error;
    }
}

/**
 *
 * returned token will have its expiresIn in seconds remaning!!
 * thsi is different hten date from ajvacritp which works in seconds sicne the epoch
 * or fro mexpiresIn used in signToken
 */
function verifyToken(
    token: string,
    secretType: tokenEnum,
    authenticated: (payload: Object | undefined) => void,
    unauthorized: () => void,
    options?: jwt.VerifyOptions,
) {
    jwt.verify(token, process.env[secretType] as string, options, (error, payload) => {
        if (error) {
            console.error(error);
            return unauthorized();
        }

        authenticated(payload);
    })
}

type refreshTokensType = {
    [key: string]: string
}
const refreshTokens: refreshTokensType = {};

/**
 * storing refresh TOken should not pause the main thread and can be saflety done after sendign the response
 */
function storeRefreshToken(expiresIn: string, jwtid: string) {
    nextTick(() => {
        refreshTokens[jwtid] = expiresIn;
    })
}

async function getRefreshToken(jti: string): Promise<string | undefined> {
    return refreshTokens[jti];
}

async function revokeRefreshToken(jti: string): Promise<void> {
    delete refreshTokens[jti];
}

type refreshTokenPayload = {
    nickname: string,
    iat: number,
    exp: number,
    jti: string
}
/**
 * double chekc of expried time
 * one taken straight from the token, the other from the databaase
 * one fro mthe database is stored in secodns remaining.
 * one from the token is in seconds since the Epoch
 * the one fro mthe database we add issuedAt (i nseconds since the epoch) to secodns remaining
 * both shoudl now be equal adn bot hshould be greater than currentTIme (seconds since the epoch)
 */
async function checkExpiredRefreshToken(token: refreshTokenPayload): Promise<boolean> {
    let expired = true;
    // date.now() retursn miliseconds. tokekn expiresIn are in seconds
    const currentTime = Math.round((Date.now()/1000));

    const expiredAtFromStorage = await getRefreshToken(token.jti);
    if (!expiredAtFromStorage) {
        return expired;
    }

    const expiresAtFromStorage= token.iat + parseInt(expiredAtFromStorage);
    const expiresAt = token.exp;

    if (expiresAt >= currentTime && expiresAtFromStorage >= currentTime) {
        expired = false;
    }

    return expired;
}

export {
    createAccessToken,
    createRefreshToken,
    createRefreshTokenType,
    createAccessTokenType,
    verifyToken,
    checkExpiredRefreshToken,
    storeRefreshToken,
    revokeRefreshToken,
    refreshTokenPayload
};