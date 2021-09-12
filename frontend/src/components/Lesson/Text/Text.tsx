import React from 'react';
import './Text.scss';

interface Props {
  text: string;
}

export const Text = ({ text }: Props) => {
  return <div className="lesson-page-text">{text}</div>;
};
