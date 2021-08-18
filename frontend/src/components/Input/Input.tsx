import React from 'react';
import './Input.scss';

interface Props {
  label: string;
  id: string;
  width?: number;
  type?: Types;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

type Types = 'password' | 'text';

export const Input = ({ width, label, id, type = 'text', onChange }: Props) => {
  const style = width ? `${width}px` : '100%';
  return (
    <div className="input" style={{ width: style }}>
      <input className="input-input" type={type} id={id} required onChange={onChange} />
      <label className="input-label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};
