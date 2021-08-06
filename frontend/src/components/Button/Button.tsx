import React from 'react';
import './Button.scss';

interface Props {
  children: React.ReactNode;
  type: Types;
  color: Colors;
}

type Types = 'bold' | 'outline';
type Colors = 'main' | 'primary' | 'danger' | 'success';

export const Button = ({ children, type, color }: Props) => {
  return <button className={`button ${type} ${color}`}>{children}</button>;
};
