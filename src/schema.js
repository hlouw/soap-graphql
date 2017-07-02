import { makeExecutableSchema, gql } from "graphql-tools";

const typeDefs = `
  type Author {
    id: Int!
    firstName: String
    lastName: String
  }

  # A stock quote
  type StockQuote {
    quote: String
  }

  # the schema allows the following query:
  type Query {
    author(id: Int!): Author
    stockQuote(symbol: String!): StockQuote
  }
`;

const resolvers = {
  Query: {
    author: (_, { id }, { authors }) => authors.find(id),
    stockQuote: (_, { symbol }, { stockQuote }) => stockQuote.get(symbol)
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;
