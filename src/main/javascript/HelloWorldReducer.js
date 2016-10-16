// Here we are defining the "Hello World" reducer, it is responsible for taking the "text" field from it's supplied
// "action" and producing a new Redux "state" that contains that new "text" field. Doing this will cause Redux to
// re-render any registered React components that are bound to the states "text" field. You can see one of these
// bindings in "HelloWorldContainer.js".
// NOTE: Normally you would have multiple reducers for any given component.
export default (state = {}, action) => {
    // Only modify the state if the current Redux action is a 'HELLO_WORLD' action.
    return action.type === 'HELLO_WORLD' ? Object.assign({}, state, {text: action.text}) : state
}