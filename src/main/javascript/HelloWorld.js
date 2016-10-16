import React, {PropTypes} from "react";

const HelloWord = ({text}) => (
    <div className="hello_world">
        <p>{text}</p>
    </div>
);

HelloWord.propTypes = {
    text: PropTypes.string
};

export default HelloWord