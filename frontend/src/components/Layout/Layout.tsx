import React from 'react';
import './Layout.scss';

interface Props {
  title: string;
  children: JSX.Element | JSX.Element[];
}

export const Layout = ({ title, children }: Props) => {
  return (
    <div className="layout">
      <div className="layout-title">{title}</div>
      <div className="layout-body">{children}</div>
    </div>
  );
};
