import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

type InputProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { isPassword?: boolean };

export const Input: React.FC<InputProps> = ({
  isPassword = false,
  className,
  ...props
}) => {
  return (
    <input
      className={`${className} p-2 placeholder-white text-center
       text-white bg-gray-400 border-none rounded-md focus:ring-gray-800 focus:ring-2`}
      {...props}
      type={isPassword ? 'password' : 'text'}
    />
  );
};
