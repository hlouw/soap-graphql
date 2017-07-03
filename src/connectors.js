import { soap } from "strong-soap";

export const createSoapClient = wsdlUrl => {
  return new Promise((resolve, reject) => {
    soap.createClient(wsdlUrl, {}, (err, client) => {
      return err ? reject(err) : resolve(client);
    });
  });
};

export class SoapConnector {
  constructor(soapClient) {
    this.soapClient = soapClient;
  }

  request(service, port, op, requestArgs) {
    const method = this.soapClient[service][port][op];
    return new Promise((resolve, reject) => {
      method(requestArgs, (err, result, envelope, soapHeader) => {
        return err ? reject(err) : resolve(result);
      });
    });
  }
}
