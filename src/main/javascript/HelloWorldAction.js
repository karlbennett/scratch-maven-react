import fetch from 'isomorphic-fetch';
import HelloWorldService from './HelloWorldService';

// Here we are defining an asynchronous Redux action by returning a function that takes the Redux "dispatch()" function
// as it's first argument. This will only work if you have added the "redux-thunk" middleware when creating your store.
// You can see this being done in the "app.jsx" file.
// NOTE: Normally you would have multiple actions for any given component.
export default () =>
  // Once the "Hello World" request has returned a 'HELLO_WORLD' action will be dispatched to any registered Redux
  // reducers.
  dispatch => new HelloWorldService(fetch).request(data => dispatch({ type: 'HELLO_WORLD', text: data }));
