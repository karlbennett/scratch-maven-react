"use strict";

import React from "react";
import rest from "rest";
import HelloWorldService from "./HelloWorldService.js";

export class Application extends React.Component {
    constructor(props) {
        super(props);
        this.helloWorldService = new HelloWorldService(rest);
        this.state = {
            text: ''
        };
    }

    componentDidMount() {
        // Here we do the call to the Spring MVC backend.
        this.helloWorldService.request(data => this.setState({text: data}));
    }

    render() {
        return (
            <div className="hello_world">
                <p>{this.state.text}</p>
            </div>
        );
    }
}