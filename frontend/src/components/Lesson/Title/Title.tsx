import React from 'react';
import './Title.scss';

interface Props {
  title: string;
}

export const Title = ({ title }: Props) => {
  return <div className="lesson-page-title">{title}</div>;
};
