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

const GET_USER = gql`
    query getUser($user: UserInput) {
        user: User(user: $user) {
            email
        }
    }
`;

const SAVE_TASK = gql`
    mutation saveTask($task: TaskInput) {
        createTask(task: $task) {
            name
        }
    }
`;

const CREATE_TEST_TASk = gql`
    mutation createTestTask($test: TestInput) {
        createTest(test: $test)
    }
`;

const queries = {
    GET_QUOTES,
    GET_TASKS,
    GET_USER
}

const mutations = {
    SAVE_TASK,
    CREATE_TEST_TASk
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