import client from '../db/initialize';

type authetnicateType = {
    id: string,
    password: string
}

async function authenticate({ id, password }: authetnicateType) {
    try {
        console.log("before");
        var result =  await client.client.query(
            'SELECT * FROM "user"'
        );
            
        console.log(result);
    } catch(error: any) {
        console.log(error);
    }

}

export {
    authenticate
}