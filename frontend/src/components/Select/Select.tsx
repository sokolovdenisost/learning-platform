import React from 'react';
import './Select.scss';

interface Props {
  title: string;
  options: string[];
  id: string;
  width?: string;
  onChange: any;
  value?: string;
}

export const Select = ({ title, options, width = '100%', id, onChange, value }: Props) => {
  return (
    <div className="select-block">
      <div className="select-title">{title}</div>
      <select className="select" defaultValue={value ? value : 'Please select'} style={{ width }} id={id} onChange={onChange}>
        <option className="select-option" value="Please select" disabled>
          Please select
        </option>
        {options.map((option) => {
          return (
            <option className="select-option" key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};
