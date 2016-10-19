import HelloWorldService from '../../main/javascript/HelloWorldService.js';

// Test Stubs
function Promise() {
}
Promise.prototype.then = function () {
};
function Response() {
}
Promise.prototype.entity = '';

// Tests
describe('HelloWorldService', () => {

  it('Can make a request to the endpoint', () => {

    var rest = mockFunction();
    var data = mockFunction();
    var promise = mock(Promise);
    var response = mock(Response);
    var entity = 'some data';

    // Given
    when(rest)('/hello').thenReturn(promise);
    when(promise).then(anything()).then((callback) => callback(response));
    response.entity = entity;

    // When
    new HelloWorldService(rest).request(data);

    // Then
    verify(data)(entity);
  });
});