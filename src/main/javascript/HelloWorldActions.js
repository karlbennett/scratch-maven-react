import rest from "rest";
import HelloWorldService from "./HelloWorldService.js";

export const getHelloWorld = () => {
    return (dispatch) => new HelloWorldService(rest).request(data => dispatch({type: 'HELLO_WORLD', text: data}))
};