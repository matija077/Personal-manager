import User from './user.page';

import { useGetUserData } from './user.hooks';

import { contextDataType, userType } from './../../graphQL/types';

function UserContainer(props: any) {
    const userData = useGetUserData();
    console.log(userData);
    const { name, nickname, email, id, surname } = userData?.data || {};


    return(
        <User
            name={name}
            nickname={nickname}
            email={email}
            id={id}
            surname={surname}
        />
    );

}

export default UserContainer;