import React from 'react';
import './Button.scss';

interface Props {
  children: React.ReactNode;
  type: Types;
  color: Colors;
  fontSize: FontSize;
  onClick?: any;
  width?: string;
  disable?: boolean;
}

type FontSize = '14' | '16' | '18';
type Types = 'bold' | 'outline';
type Colors = 'main' | 'primary' | 'danger' | 'success' | 'cancel';

export const Button = ({ children, type, color, fontSize, onClick, width, disable }: Props) => {
  const styles = disable ? 'disable' : `${type} ${color}`;
  return (
    <button disabled={disable} className={`button ${styles}`} style={{ fontSize: `${fontSize}px`, width: width }} onClick={onClick}>
      {children}
    </button>
  );
};
