import jwt from 'jsonwebtoken';
import { tokenEnum } from '../utility/types';

type createTokenReturnType = {
    token: string,
    expiresIn: string
}
async function createToken(nickname: string): Promise<createTokenReturnType> {
    const expiresIn = process.env.TOKEN_EXPIRES_SECONDS || "60";

    const token = await signToken(
        {nickname},
        tokenEnum.TOKEN_SECRET,
        {
            expiresIn: parseInt(expiresIn)
        }
    );

    return {
        token,
        expiresIn
    }
}

async function createRefreshToken(nickname: string): Promise<string> {
    return await signToken(
        nickname,
        tokenEnum.REFRESH_TOKEN_SECRET
    );
}

// expiresIn - number - seconds, string - milliseconds
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
    [key: string]: {
        expiresIn: number
    }
}
const refreshTokens = []

async function checkExpiredRefreshToken(token: string): Promise<boolean> {

}

export {
    createToken,
    createRefreshToken,
    verifyToken,
    checkExpiredRefreshToken
};