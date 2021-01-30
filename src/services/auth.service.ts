import client from '../db/initialize';
import bcrypt from 'bcrypt';

type authetnicateType = {
    id: string,
    password: string
}

async function authenticate({ id, password }: authetnicateType): Promise<boolean> {
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

        /*console.log("before");
        const text = 'INSERT INTO "user" (Surname, Name, password)';
        const values = [];*/
        const text = 'SELECT password FROM "user" WHERE id = $1';
        const values = [id];
        var result =  await client.client.query(
            text,
            values
        );
        const hashedPassord = result.rows[0].password;
            
        const passwordsMatch = await new Promise(function(resolve, reject) {
            bcrypt.compare(password, hashedPassord, function(error, result) {
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