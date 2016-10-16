"use strict";

import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {getHelloWorld} from "./HelloWorldActions.js";
import HelloWorld from "./HelloWorld.js";

class HelloWorldContainer extends Component {

    static propTypes = {
        text: PropTypes.string,
        getHelloWorld: PropTypes.func,
    };

    componentWillMount() {
        this.props.getHelloWorld();
    }

    render() {
        const {text} = this.props;
        return (
            <HelloWorld text={text}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        text: state.text
    }
};

export default connect(mapStateToProps, {getHelloWorld})(HelloWorldContainer)


