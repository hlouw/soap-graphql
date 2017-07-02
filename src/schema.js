import { makeExecutableSchema, gql } from "graphql-tools";

const typeDefs = `
  type Author {
    id: Int!
    firstName: String
    lastName: String
  }

  # the schema allows the following query:
  type Query {
    author(id: Int!): Author
  }
`;

const resolvers = {
  Query: {
    author: (_, { id }, { authors }) => authors.find(id)
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;
