import React from "react";
import "./index.css";

interface ButtonIconProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}

const ButtonIcons: React.FC<ButtonIconProps> = ({
  src,
  alt,
  className,
  onClick,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
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
