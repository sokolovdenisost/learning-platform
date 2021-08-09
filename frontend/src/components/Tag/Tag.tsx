import React from 'react';
import './Tag.scss';

interface Props {
  title: string;
  selected?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const Tag = ({ title }: Props) => {
  return <div className={`tag-block ${title}`}>{title}</div>;
};

export const SearchTag = ({ title, selected, onClick }: Props) => {
  return (
    <div data-name={title} className={selected ? 'tag-search-block selected' : 'tag-search-block'} onClick={onClick}>
      {title}
    </div>
  );
};
