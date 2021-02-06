import jwt from 'jsonwebtoken';

async function createToken(nickname: string): Promise<string> {
    try {
        const token: string = await new Promise(function (resolve, reject) {
            jwt.sign(
                {nickname}, 
                process.env.TOKEN as string, 
                {expiresIn: "2 days"}, 
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

export {
    createToken
};