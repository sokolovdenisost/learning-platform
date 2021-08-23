import React from 'react';
import './Textarea.scss';

interface Props {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
}

export const Textarea = ({ value, onChange, placeholder }: Props) => {
  return <textarea defaultValue={value} placeholder={placeholder} onChange={(e) => onChange(e)}></textarea>;
};
