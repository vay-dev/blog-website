import "./styles/border.scss";
import React from "react";

interface CusBorderProps {
  children: React.ReactNode;
  className: string;
}

const CusBorder: React.FC<CusBorderProps> = ({ children, className }) => {
  return <div className={`border-wrapper ${className}`}>{children}</div>;
};

export default CusBorder;
