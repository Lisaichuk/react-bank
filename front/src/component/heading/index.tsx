import React from "react";
import "./index.css";

interface HeadingProps {
  title: string;
  subtitle: string;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle }) => {
  return (
    <div className="heading-block">
      <h1 className="title">{title}</h1>
      <h2 className="subtitle">{subtitle}</h2>
    </div>
  );
};

export default Heading;
