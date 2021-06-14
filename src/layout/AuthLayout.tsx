import React from "react";

export interface Props {
  label: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<Props> = ({ label, children }:Props) => {
  return (
    <div className="bg-gray-lightest w-screen h-screen pt-10">
      <div className="m-auto py-10 px-8 rounded-md bg-beige max-w-sm">
        <h2 className="text-center font-bold text-purple-dark mb-2">{label}</h2>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;