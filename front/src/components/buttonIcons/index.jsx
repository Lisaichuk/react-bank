import React from "react";
import "./index.css";

const ButtonIcons = ({
  src,
  alt,
  className,
  onClick,
}) => {
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <button onClick={handleClick} className={`button__icon ${className}`}>
      <img src={src} alt={alt} />
    </button>
  );
};

export default ButtonIcons;
