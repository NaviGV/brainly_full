
import React from 'react';

export interface ButtonProps {
  variant: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  text?: string;
  onClick?: () => void;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  loading? :boolean;
}

export const Button = ({
  variant,
  text,
  size = "md",
  onClick,
  startIcon,
  endIcon,
  loading,
  className = "",
}: ButtonProps) => {
  
  const sizeClasses = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-4 py-2",
    lg: "text-lg px-6 py-3"
  };

  const variantStyles = {
    primary: "bg-purple-600 text-white",
    secondary: "bg-purple-300 text-purple-600"
  };

  const defaultStyles = "px-4 py-2 rounded-md  flex items-center font-light space-between "; 
  
 
  const buttonClasses = `${defaultStyles} ${sizeClasses[size]} ${variantStyles[variant]} ${className}`;

  return (
    <button className={`${buttonClasses} ${loading ? "opacity-45" : ""}`} onClick={onClick} >
      {startIcon ? <div className='pt-1 pr-2'>{startIcon}</div>:null}
      {text}
      {endIcon ? <div className='pr-2'>{endIcon}</div>:null}
    </button>
  );
};

export default Button;