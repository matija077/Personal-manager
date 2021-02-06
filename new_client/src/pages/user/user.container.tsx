import User from './user.page';

import { useGetUserData } from './user.hooks';

function UserContainer(props: any) {
    const user = useGetUserData();

    return(
        <User 
        
        />
    );

}

export default UserContainer;