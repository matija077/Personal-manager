import { ApolloClient, ApolloLink, DefaultOptions, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import { useSelector } from 'react-redux';
import { getUser } from '../redux/user-reducer/user.selectors';

var client: ApolloClient<any>;

const authMiddleware = new ApolloLink((operation, forward) => {
    const { token } = useSelector(getUser);

    if (token) {
        operation.setContext({
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    return forward(operation);
})

var link = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
        console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
        );
    console.log(networkError);
    console.log(graphQLErrors);

    if (networkError){
    
        
        console.log(`[Network error]: ${networkError}`);
        //console.log(networkError);
    }
});

const defaultOptions: DefaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache'
    },
    query: {
        fetchPolicy: 'no-cache'
    }
};

(function(){
    client = new  ApolloClient({
        cache: new InMemoryCache(),
        link: ApolloLink.from([authMiddleware, new HttpLink({uri: 'http://localhost:5012/graphql'})]),
        defaultOptions: defaultOptions
    });
}());

export {
    client
}