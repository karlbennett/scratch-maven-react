// This is the service that makes the "Hello World" HTTP request. It is completely decouple from any React or Redux
// code, this makes it much simpler to unit test.
export default class HelloWorldService {
  constructor(rest) {
    this.rest = rest;
  }

  // Make the HTTP request and pass the response body down into the supplied callback.
  request(processData) {
    this.rest('/hello').then(response => processData(response.entity));
  }
}
