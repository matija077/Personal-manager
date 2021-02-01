import client from '../db/initialize';
import bcrypt from 'bcrypt';

type authetnicateParamsType = {
    email: string,
    password: string
}

type authenticateReturnType = {
    isMatched: boolean | null,
    nickname: string | null,
}

/**
 *
 * @param {authetnicateParamsType} email, password
 * @returns {authenticateReturnType} false - no authentication
 * true - successfull authentication
 * null - something  went wrong
 */
async function authenticate({ email, password }: authetnicateParamsType): Promise<authenticateReturnType> {
    console.log("here");
    var returnType: authenticateReturnType = {
        isMatched: null,
        nickname: null
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
        const text = 'SELECT password, nickname FROM "user" WHERE email = $1';
        const values = [email];
        var result =  await client.client.query(
            text,
            values
        );
        console.log(email);
        const hashedPassword = result.rows[0].password;

        const passwordsMatch = await new Promise(function(resolve, reject) {
            bcrypt.compare(password, hashedPassword, function(error, result) {
                if (error) {
                    reject(error);
                }

                resolve(result);
            });
        });

        if (passwordsMatch) {
            returnType.isMatched = true;
        } else {
            returnType.isMatched = false;
        }
        returnType.nickname = result.rows[0].nickname;

    } catch(error: any) {
        console.log(error);
    }

    return returnType;
}

export {
    authenticate
}