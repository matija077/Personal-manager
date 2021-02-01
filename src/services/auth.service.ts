import client from '../db/initialize';
import bcrypt from 'bcrypt';

type authetnicateParamsType = {
    email: string,
    password: string
}

type authenticateReturnType = {
    isMatched: boolean | null,
    error: boolean
}

/**
 *
 * @param {authetnicateParamsType} email, password
 * @returns {authenticateReturnType}
 * false - no authentication
 * true - successful authentication
 */
async function authenticate({ email, password }: authetnicateParamsType): Promise<authenticateReturnType> {
    console.log("here");
    var returnType: authenticateReturnType = {
        isMatched: null,
        error: false
    };

    try {
        // insert into part
        /*const saltRounds = 10;
        const hashedPassword = await new Promise(function (resolve, reject) {
            bcrypt.hash(password, saltRounds, function(error, hash) {
                if (error) {
                    reject(error);
                }

                resolve(hash);
            });
        });

        console.log("before");
        const text = 'INSERT INTO "user" (surname, name, password, email) values ($1, $2, $3, $4)';
        const values = ['prsa', 'matija', hashedPassword, 'matija.prs@gmail.com'];*/

        const text = 'SELECT password FROM "user" WHERE email = $1';
        const values = [email];
        var result =  await client.client.query(
            text,
            values
        );

        const hashedPassword = result.rows[0]?.password || "";

        const passwordsMatch = await arePasswordMatching(password, hashedPassword);

        if (passwordsMatch) {
            returnType.isMatched = true;
        } else {
            returnType.isMatched = false;
        }

    } catch(error: any) {
        console.log(error);
        returnType.error = true;
    }

    return returnType;
}

function arePasswordMatching(password: string, hashedPassword: string): Promise<boolean> {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(password, hashedPassword, function(error, result) {
            if (error) {
                reject(error);
            }

            resolve(result);
        });
    });
}

export {
    authenticate
}