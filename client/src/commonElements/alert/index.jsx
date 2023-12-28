import React from "react";
import "./index.css";

import alert from "../../img/alert.svg";


const Alert = ({text}) => {
    return (
        <div className="alert">
            <img src={alert} alt="alert" className="alert-icon"/>
            <span className="alert-message">{text}</span>
        </div>
    );
};

export default Alert;
