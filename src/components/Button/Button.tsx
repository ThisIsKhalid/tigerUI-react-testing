
import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode; // Include the 'children' prop
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
};

export default Button;
