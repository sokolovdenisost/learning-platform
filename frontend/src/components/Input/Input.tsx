import React from 'react';
import './Input.scss';

interface Props {
  label: string;
  id: string;
  width?: number;
  type?: Types;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  error?: string;
}

type Types = 'password' | 'text';

export const Input = ({ value, width, label, id, type = 'text', onChange, error }: Props) => {
  const styleError = {
    input: {
      borderColor: '#f45555',
    },
    label: {
      color: '#f45555',
    },
  };

  const style = width ? `${width}px` : '100%';
  return (
    <div className="input-block">
      <div className="input" style={{ width: style }}>
        <input value={value} className="input-input" style={error ? styleError.input : {}} type={type} id={id} required onChange={onChange} />
        <label className="input-label" htmlFor={id} style={error ? styleError.label : {}}>
          {label}
        </label>
      </div>
      {error ? <div className="input-error">{error}</div> : null}
    </div>
  );
};
