import React from "react";
import "./index.css";

interface ChildrenProps {
  children?: React.ReactNode;
}

export const Page: React.FC<ChildrenProps> = ({ children }) => {
  return <div className="page">{children}</div>;
};
