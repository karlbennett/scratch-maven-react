"use strict";

import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import reduxThunk from "redux-thunk";
import HelloWorldReducers from "./HelloWorldReducers.js";
import HelloWorldApp from "./HelloWorldApp.js";

require('../sass/main.scss');

let store = createStore(HelloWorldReducers, applyMiddleware(reduxThunk));

window.app = ReactDOM.render(
    <Provider store={store}>
        <HelloWorldApp/>
    </Provider>,
    document.getElementById('content')
);
