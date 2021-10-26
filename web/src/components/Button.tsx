import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {};

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={`${className} w-full bg-gray-500
  ml-2 p-2 text-white
    rounded-md hover:bg-gray-600 focus:shadow-md
     focus:ring-2 focus:ring-gray-800 `}
      {...props}
    >
      {children}
    </button>
  );
};
