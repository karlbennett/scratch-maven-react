// This is the service that makes the "Hello World" HTTP request. It is completely decouple from any React or Redux
// code, this makes it much simpler to unit test.
export default class HelloWorldService {
  constructor(fetch) {
    this.fetch = fetch;
  }

  // Make the HTTP request and pass the response body down into the supplied callback.
  request(processData) {
    this.fetch('/hello').then(response => response.text()).then(text => processData(text));
  }
}
