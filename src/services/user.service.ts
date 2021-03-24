import client from '../db/postgres/initialize';

type getUserByNicknameParamsType = {
    nickname: string
}

type userType = {
    nickname?: string,
    email?: string,
    name?: string,
    surname?: string,
    id?: string
};

async function getUserByNickname({ nickname }: getUserByNicknameParamsType): Promise<userType> {
    try {
        const text = 'SELECT nickname, name, surname, email, id from "user" WHERE nickname = $1';
        const values = [nickname];
        /*if (!client.connected) {
            throw new Error("no connection");
        }*/

        const result = await client.client.query(
            text,
            values
        );

        //console.log(result);

        return result.rows[0];
    } catch(error: any) {
        throw error;
    }
}

export {
    getUserByNickname
}