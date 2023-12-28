import React from "react";
import "./index.css";

const Heading = ({title, subtitle}) => {
    return (
        <div className="heading-block">
            <h1 className="title">{title}</h1>
            <h2 className="subtitle">{subtitle}</h2>
        </div>
    );
};

export default Heading;
