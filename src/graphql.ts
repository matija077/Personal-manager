var { ApolloServer, gql }= require("apollo-server");

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

const typeDefs = gql`
    type Quote {
        author: String
        text: String!
    }

    type Query {
        getQuotes: [Quote]
    }
`;

const resolvers = {
    Query: {
        getQuotes: () => quotes
    }
}

const server = new ApolloServer({ typeDefs, resolvers });
server.listen(5013);
// fordebugginf 5013 ports is graphql
console.log(server);


function apollo() {}

module.exports = {
    resolvers,
    server
};