import { useQuery } from '@apollo/client';

import { queries } from './../../graphQL/resolvers';
import { graphQLResponseType, userType } from './../../graphQL/types';

function useGetUserData() {
    //const { loading, error, data }: 
    const { loading, error, data }: graphQLResponseType<userType> = 
    useQuery(queries.GET_USER, {variables: {
        "user" : {nickname: "matija"}}});

    return { loading, error, data };
}

type useHandlePropsType = {
    render: any,
    loading: {
        loading: boolean,
        fixed: boolean
    },
    error?: any,
};

// copy contetContainer
function useHandleLoadingAndError({ render, loading: { loading, fixed }, error }: useHandlePropsType) {

}

export {
    useGetUserData,
    useHandleLoadingAndError
};

