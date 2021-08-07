import React from 'react';
import './Tag.scss';

interface Props {
  title: string;
}

export const Tag = ({ title }: Props) => {
  return <div className={`tag-block ${title}`}>{title}</div>;
};
