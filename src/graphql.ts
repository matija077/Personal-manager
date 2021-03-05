const {
    GraphQLList,
    GraphQLNonNull,
     GraphQLObjectType,
     GraphQLSchema,
     GraphQLString,
     GraphQLError
} =  require("graphql");

import {
    ApolloServer,
    gql,
    AuthenticationError,
    ForbiddenError,
    UserInputError,
    ApolloError

} from "apollo-server-express";
import { PORT } from "./config/utils";

import { getToken, verifyToken } from './utility/utilty';
import { returnCodes } from './config/utils';

import { getUserByNickname } from './services/user.service';
import { quoteType, taskType } from "../new_client/src/graphQL/types";

/*type QuotesType = {
    author?: String,
    text: String
}*/

// : Array<QuotesType>

const quotes  = [
    {
        author: "Anja Mustac",
        text: "Always Hungry",
    },
    {
        author: "Anja Mustac",
        text: "Always Hungry",
    },
    {
        author: "Albert Einstein",
        text: `ONLY TWO THINGS ARE INFINITE, THE UNIVERSE AND HUMAN STUPIDITY,
        AND I'M NOT SURE ABOUT THE FORMER`,
    }
];

const taskCategories = {
    "c++": "c++",
    "plesanje": "plesanje",
    "nista": "nista"
};

const tasks  = [
    {
        name: "Organizacija doma",
        location: "Kucica",
        category: taskCategories.nista,
        description: "",
    },
    {
        name: "Plesanje",
        location: "Kucica 2",
        category: taskCategories.plesanje,
        description: "",
    },
    {
        name: "Gledanej serija",
        location: "Kucica",
        category: taskCategories.nista,
        description: "",
    }
];

function formatError(error: typeof GraphQLError)  {
    const returnError: {
        message: string,
        status: number | undefined
    } = {
        message: error.message as string,
        status: undefined
    }

    if (error.originalError instanceof AuthenticationError) {
        returnError.status = returnCodes.unauthorized
    }
    if (error.originalError instanceof ForbiddenError) {
        returnError.status = returnCodes.forbidden
    }
    if (error.originalError instanceof UserInputError) {
        returnError.status = returnCodes.error
    }

    return returnError;
}

function getQuotes(parent:any, args: any, context: any, info: any): Array<quoteType> {
    return quotes;
}

function getTasks(parent:any, args: any, context: any, info: any): Array<taskType> {
    if (!context.user.token) {
        throw new AuthenticationError("missing token");
    }

    return tasks;
}

function getUser(user: any) {
    console.log(user);
    // this shoudl return null for graphql
    async function getUserAsync() {
        try {
            const data = await getUserByNickname(user);

            return data;
        } catch(error: any) {
            throw error;
        }
    }

    return getUserAsync();
}

const typeDefs = gql`
    type Quote {
        author: String
        text: String!
    }
    type Task {
        name: String,
        location: String!,
        category: String,
        description: String!
    }
    type User {
        email: String,
        nickname: String,
        name: String!,
        surname: String!,
        id: Int
    }

    input TaskInput {
        name: String,
        location: String!,
        category: String,
        description: String!
    }

    input TestInput {
        name: String
    }

    input UserInput {
        nickname: String
    }

    type Query {
        Quotes: [Quote]
        Tasks: [Task]
        User(user: UserInput): User
    }

    type Mutation {
        createTask(task: TaskInput): Task
        createTest(test: TestInput): String
    }
`

type mutationArgsType = {
    parent: any,
    args: any,
    context: any,
    info: any
};

const resolvers = {
    Query: {
        Quotes: getQuotes,
        Tasks: getTasks,
        User: (_: any, {user}: any) => getUser(user),
    },
    Mutation: {
        createTask: (parent:any, args: any, context: any, info: any) => {
            tasks.push(args.task);

            return args.task;
        },
        createTest:  (parent:any, args: any, context: any, info: any) => {
            console.log(info);

            return "Succesfu lmtuation";
        }
    }
}

var QuoteType = new GraphQLObjectType({
    name: "Quote",
    description: "a single Quote",
    fields: function() {
        return {
            name: {
                type: GraphQLNonNull(GraphQLString),
            },
            author: {
                type: GraphQLString,
            }
        }
    }
});

var RootQueryType = new GraphQLObjectType({
    name: "query",
    description: "Root query",
    fields: function() {
        return {
            quotes: {
                type: new GraphQLList(QuoteType),
                description: "list of all quotes",
                resolve: function() {
                    return quotes;
                }
            }
        }
    }
});

var RootMutationType = new GraphQLObjectType({
    name: "Mutation",
    description: "Root mutation",
    fields: function() {
        return {
            createTask: {
                type: GraphQLString,
                resolve: function() {
                    console.log("success");
                }
            }
        }
    }
});

var schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
})

//const server = new ApolloServer({ schema });
const server = new ApolloServer({
    typeDefs,
    resolvers,

    context: ({ req }) => {
            var user: any  = {};

            const authHeader = req.headers.authorization;

            const token = getToken(authHeader);

            if (token) {
                verifyToken(token, () => user.token = token, () => console.log("forbidden"));
            } else {
                console.log(" unaothized");
            }

            return { user };
    },
    formatError: formatError
});
/*server.listen({
    path: "http://localhost:5013/graphql",
    host: "localhost"
});*/
// fordebugginf 5013 ports is graphql

module.exports = {
    resolvers,
    server
};