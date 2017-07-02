export class Authors {
  constructor({ connector }) {
    this.connector = connector;
  }

  find(id) {
    return this.connector.findAuthor(id);
  }
}

export class StockQuote {
  constructor({ connector }) {
    this.connector = connector;
  }

  get(symbol) {
    return this.connector.request("GetQuote", { symbol }).then(result => ({
      quote: result.GetQuoteResult
    }));
  }
}
