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
        tokenEnum.TOKEN,
        {
            expiresIn: expiresIn
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
        tokenEnum.REFRESHTOKEN
    );
}

async function signToken(data: string | object | Buffer, secretType: tokenEnum, options: jwt.SignOptions = {}) {
    try {
        console.log(secretType);
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

export {
    createToken,
    createRefreshToken
};