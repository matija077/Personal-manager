import client from '../db/initialize';
import bcrypt from 'bcrypt';

type authetnicateType = {
    id: string,
    password: string
}

async function authenticate({ id, password }: authetnicateType): Promise<boolean> {
    console.log("here");
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
        const text = 'SELECT password FROM "user" WHERE id = $1';
        const values = [id];
        var result =  await client.client.query(
            text,
            values
        );
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
            return true;
        } else {
            return false;
        }

    } catch(error: any) {
        console.log(error);
    }

    return false;
}

export {
    authenticate
}