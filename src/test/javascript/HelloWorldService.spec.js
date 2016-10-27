import HelloWorldService from '../../main/javascript/HelloWorldService.js';

// Test Stubs
function Promise() {
}
Promise.prototype.then = function () {
};
function Response() {
}
Response.prototype.text = function () {
};

// Tests
describe('src/test/javascript/HelloWorldService.spec.js', () => {

  it('Can make a request to the endpoint', () => {

    var fetch = mockFunction();
    var data = mockFunction();
    var responsePromise = mock(Promise);
    var response = mock(Response);
    var dataPromise = mock(Promise);
    var text = 'some data';

    // Given
    when(fetch)('/hello').thenReturn(responsePromise);
    when(responsePromise).then(anything()).then((callback) => callback(response));
    when(response).text().thenReturn(dataPromise);
    when(dataPromise).then(anything()).then((callback) => callback(text));

    // When
    new HelloWorldService(fetch).request(data);

    // Then
    verify(data)(text);
  });
});