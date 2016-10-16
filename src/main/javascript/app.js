"use strict";

import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import reduxThunk from "redux-thunk";
import {Router, Route, browserHistory} from "react-router";
import HelloWorldReducers from "./HelloWorldReducer.js";
import HelloWorldContainer from "./HelloWorldContainer.js";

require('../sass/main.scss');

let store = createStore(HelloWorldReducers, applyMiddleware(reduxThunk));

window.app = ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={HelloWorldContainer}>
                <Route path="helloWorld" component={HelloWorldContainer}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('content')
);
