import React from "react";
import "./index.css";

interface ButtonProps {
  text?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  className,
  onClick,
  disabled,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
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
