import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from "@apollo/client/link/error";

var client: ApolloClient<any>;

var link = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
        console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
        );

    if (networkError) console.log(`[Network error]: ${networkError}`);
});

(function(){
    client = new  ApolloClient({
        cache: new InMemoryCache(),
        link: ApolloLink.from([link, new HttpLink({uri: 'http://localhost:5012/graphql'})])
    });
}());

export {
    client
}