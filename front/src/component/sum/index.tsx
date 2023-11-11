import React from "react";
import "./index.css";

interface SumProps {
  sign?: string;
  value?: string;
  className?: string;
  color?: string;
}

const Sum: React.FC<SumProps> = ({
  sign = "$",
  value = "0.00",
  className = "",
  color = "",
}) => {
  let sum = String(value);

  if (!sum.includes(".")) {
    sum = sum + ".00";
  }

  const sumArr = sum.split(".");

  return (
    <div className="sum">
      <div className={`${className} ${color}`}>{sign}</div>
      <div>
        <span className={`${className} ${color}`}>{sumArr[0]}</span>
        <span className={`${className} ${color}`}>.{sumArr[1]}</span>
      </div>
    </div>
  );
};

export default Sum;
