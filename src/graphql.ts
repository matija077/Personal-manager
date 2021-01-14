var { ApolloServer, gql }= require("apollo-server-express");

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

    type Query {
        getQuotes: [Quote]
        getTasks: [Task]
    }
`;

const resolvers = {
    Query: {
        getQuotes: () => quotes,
        getTasks: () => tasks
    }
}

const server = new ApolloServer({ typeDefs, resolvers });
/*server.listen({
    path: "http://localhost:5013/graphql",
    host: "localhost"
});*/
// fordebugginf 5013 ports is graphql

module.exports = {
    resolvers,
    server
};