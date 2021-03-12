import jwt from 'jsonwebtoken';

async function createToken(nickname: string): Promise<string> {
    try {
        const token: string = await new Promise(function signToken(resolve, reject) {
            jwt.sign(
                {nickname}, 
                process.env.TOKEN as string, 
                {expiresIn: "1m"}, 
                function(err: Error | null, token: string | undefined) {
                    if (token) {
                        resolve(token);
                    }

                    reject(err);
            });
        });

        // console.log(token);

        return token;
    } catch(error) {
        throw error;
    }
}

async function createRefrehToken(nickname: string): Promise<string> {
    try {
        const refreshToken: string = await new Promise(function signRefreshToken(resolve, reject) {
            jwt.sign(
                {nickname},
                process.env.TOKEN as string,
                function(err: Error | null, token: string | undefined) {
                    if (token) {
                        resolve(token);
                    }

                    reject(err);
                }
            )   
        })

        return refreshToken;
    } catch(error) {
        throw error;
    }
}

export {
    createToken,
    createRefrehToken
};