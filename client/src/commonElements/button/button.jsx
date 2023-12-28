import React from "react";
import "./index.css";


const Button = ({
                    text,
                    className,
                    onClick,
                    disabled,
                }) => {
    const handleClick = (e) => {
        if (onClick) {
            e.preventDefault();
            onClick();
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={disabled}
            className={`button ${className}`}
        >
            {text}
        </button>
    );
};

export default Button;
