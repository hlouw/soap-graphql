import { makeExecutableSchema, gql } from "graphql-tools";

const typeDefs = `
  type Weather {
    weather: String
  }

  type City {
    Country: String,
    City: String
  }

  # the schema allows the following query:
  type Query {
    weather(cityName: String, countryName: String): Weather
    cities(countryName: String): [City]
  }
`;

const resolvers = {
  Query: {
    weather: (_, { cityName, countryName }, { globalWeather }) =>
      globalWeather.getWeather(cityName, countryName),
    cities: (_, { countryName }, { globalWeather }) =>
      globalWeather.getCities(countryName)
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;
