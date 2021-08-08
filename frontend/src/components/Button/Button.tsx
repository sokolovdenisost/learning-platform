import React from 'react';
import './Button.scss';

interface Props {
  children: React.ReactNode;
  type: Types;
  color: Colors;
  fontSize: FontSize;
}

type FontSize = '14' | '16' | '18';
type Types = 'bold' | 'outline';
type Colors = 'main' | 'primary' | 'danger' | 'success';

export const Button = ({ children, type, color, fontSize }: Props) => {
  return (
    <button className={`button ${type} ${color}`} style={{ fontSize: `${fontSize}px` }}>
      {children}
    </button>
  );
};
