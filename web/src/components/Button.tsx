import { useRouter } from "next/dist/client/router";
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { Spinner } from "./Spinner";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { loading?: boolean; isDisabled?: boolean };

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  loading,
  isDisabled,
  ...props
}) => {
  return (
    <button
      type="button"
      data-testid="button"
      className={`flex items-center justify-center w-full  bg-gray-500
  ml-2 p-2 text-white
    rounded-md hover:bg-gray-600 focus:shadow-md
     focus:ring-2 focus:ring-gray-800 ${
       isDisabled ? "cursor-not-allowed" : ""
     } ${className} `}
      {...props}
      disabled={isDisabled}
    >
      {loading ? (
        <span role="loading" className={`self-start`}>
          <Spinner />
        </span>
      ) : null}
      <span>{children}</span>
    </button>
  );
};

type OauthButtonProps = {
  provider: "github" | "facebook" | "google";
};

export const OauthButton: React.FC<OauthButtonProps> = ({
  children,
  provider,
}) => {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        router.push(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/login/${provider}`
        );
      }}
    >
      {children}
    </Button>
  );
};
