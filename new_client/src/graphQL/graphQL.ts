import { ApolloClient, InMemoryCache } from '@apollo/client';

import { gql } from '@apollo/client';

var client;

(function(){
    client = new ApolloClient({
        uri: 'http://localhost:5012/graphql',
        cache: new InMemoryCache()
    });

    client.query({
        query: gql`
            query getQuotes {
                getQuotes{
                    author
                    text
                }

            }
        `
    }).then(function resolved(result) {
        console.log(result);
    })
}());

export {
    client
}