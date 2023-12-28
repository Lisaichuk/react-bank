import React from "react";
import "./index.css";

import BackButton from "../backButton";


const Header = ({pageName}) => {
    return (
        <div className="page__name">
            <BackButton/>
            <h1 className="page__title">{pageName}</h1>
        </div>
    );
};

export default Header;
