import jwt from 'jsonwebtoken';
import crypto from 'crypto';

async function createToken(nickname: string): Promise<string> {
    try {
        const token: string = await new Promise(function (resolve, reject) {
            jwt.sign(nickname, process.env.TOKEN as string, function(err: Error | null, token: string | undefined) {
                if (token) {
                    resolve(token);
                }

                reject(err);
            });
        });

        return token;
    } catch(error) {
        throw error;
    }
}

export {
    createToken
};