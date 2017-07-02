export class Authors {
  constructor({ connector }) {
    this.connector = connector;
  }

  find(id) {
    return this.connector.findAuthor(id);
  }
}
