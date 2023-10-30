import React from "react";
import "./index.css";

import alert from "../../img/alert.svg";

interface AlertProps {
  text: string;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({ text, onClose }) => {
  return (
    <div className="alert">
      <img src={alert} alt="alert" className="alert-icon" />
      <span className="alert-message">{text}</span>
    </div>
  );
};

export default Alert;
