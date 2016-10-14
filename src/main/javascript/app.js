"use strict";

import React from "react";
import ReactDOM from "react-dom";
import {Application} from "./Application.js";

require('../sass/main.scss');

window.app = ReactDOM.render(<Application />, document.getElementById('content'));