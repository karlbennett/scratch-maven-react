export default (state = {}, action) => {
    if (action.type !== 'HELLO_WORLD') {
        return state;
    }

    return Object.assign({}, state, {text: action.text})
}