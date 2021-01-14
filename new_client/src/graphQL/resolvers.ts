import { gql } from '@apollo/client';

var typeDefs = gql`{name}`;

const GET_QUOTES = gql`
    query getQuotes {
        quotes: Quotes {
            author
            text
        }
    }
`;

const GET_TASKS = gql`
    query getTasks {
        tasks: Tasks {
            name
            description
            category
            location
        }
    }
`;

const SAVE_TASK = gql`
    mutation saveTask($task: Task) {
        createTask(task: $task)
    }
`;

const queries = {
    GET_QUOTES,
    GET_TASKS 
}

const mutations = {
    SAVE_TASK
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