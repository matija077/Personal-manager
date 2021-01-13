import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

var client: ApolloClient<any>;

(function(){
    client = new  ApolloClient({
        uri: 'http://localhost:5012/graphql',
        cache: new InMemoryCache()
    });
}());

export {
    client
}