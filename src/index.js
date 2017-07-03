import express from "express";
import bodyParser from "body-parser";
import { graphqlExpress } from "graphql-server-express";
import { graphiqlExpress } from "graphql-server-express";

import {
  StaticDataConnector,
  SoapConnector,
  createSoapClient
} from "./connectors";
import { GlobalWeather } from "./models";
import schema from "./schema";

const PORT = 3000;

const app = express();

app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql"
  })
);

createSoapClient("http://www.webservicex.com/globalweather.asmx?wsdl")
  .then(client => new SoapConnector(client))
  .then(soapConnector => ({
    globalWeather: new GlobalWeather({ connector: soapConnector })
  }))
  .then(context => {
    app.use("/graphql", bodyParser.json(), graphqlExpress({ schema, context }));
  })
  .then(() => {
    app.listen(PORT);
    console.log(`Server running on http://localhost:${PORT}`);
  });
