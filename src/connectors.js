import { soap } from "strong-soap";

const authorData = [
  { id: 1, firstName: "Tom", lastName: "Coleman" },
  { id: 2, firstName: "Sashko", lastName: "Stubailo" },
  { id: 3, firstName: "Mikhail", lastName: "Novikov" }
];

export const staticDataConnector = {
  findAuthor: id => authorData[id]
};

const wsdlUrl = "http://www.webservicex.net/stockquote.asmx?WSDL";
let soapClient;
soap.createClient(wsdlUrl, {}, (err, client) => {
  soapClient = client;
});

export const soapConnector = {
  request: (op, requestArgs) => {
    const method = soapClient["StockQuote"]["StockQuoteSoap"][op];
    return new Promise((resolve, reject) => {
      method(requestArgs, (err, result, envelope, soapHeader) => {
        return err ? reject(err) : resolve(result);
      });
    });
  }
};
