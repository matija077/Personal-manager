import { gql } from '@apollo/client';

var typeDefs = gql`{name}`;

const GET_QUOTES = gql`
    query getQuotes {
        getQuotes {
            author
            text
        }
    }
`;

const GET_TASKS = gql`
    query getTasks {
        getTasks {
            name
        }
    }
`;

const queries = {
    GET_QUOTES,
    GET_TASKS 
}

const mutations = {
}

const queriesAndMutations = {
    queries,
    mutations,
};

var resolvers = {

}

export {
    resolvers,
    typeDefs,
    queriesAndMutations,
    queries,
    mutations
}