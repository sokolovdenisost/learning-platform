import React from "react";
import "./Block.scss";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const Block = ({ children }: Props) => {
  return <div className="admin-block">{children}</div>;
};
