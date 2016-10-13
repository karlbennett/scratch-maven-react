"use strict";

import React from "react";
import rest from "rest";

export class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    componentDidMount() {
        // Here we do the call to the Spring MVC backend.
        rest('/hello').then((data) => this.setState({text: data.entity}));
    }

    render() {
        return (
            <div>
                {this.state.text}
            </div>
        );
    }
}