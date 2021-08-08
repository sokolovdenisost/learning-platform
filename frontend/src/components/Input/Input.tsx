import React from 'react';
import './Input.scss';

interface Props {
  label: string;
  id: string;
  width?: number;
}

export const Input = ({ width, label, id }: Props) => {
  const style = width ? `${width}px` : '100%';
  return (
    <div className="input" style={{ width: style }}>
      <input className="input-input" type="text" id={id} required />
      <label className="input-label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};
