import React, {PropTypes} from "react";

const HelloWord = ({text}) => (
    <p>{text}</p>
);

HelloWord.propTypes = {
    text: PropTypes.string
};

export default HelloWord