import express from "express";
import bodyParser from "body-parser";
import { graphqlExpress } from "graphql-server-express";
import { graphiqlExpress } from "graphql-server-express";

import { staticDataConnector, soapConnector } from "./connectors";
import { Authors, StockQuote } from "./models";
import schema from "./schema";

const PORT = 3000;

const context = {
  authors: new Authors({ connector: staticDataConnector }),
  stockQuote: new StockQuote({ connector: soapConnector })
};

const app = express();

app.use("/graphql", bodyParser.json(), graphqlExpress({ schema, context }));
app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql"
  })
);

app.listen(PORT);

console.log(`Server running on http://localhost:${PORT}`);
