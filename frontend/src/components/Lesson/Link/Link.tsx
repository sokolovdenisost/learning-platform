import React from 'react';
import './Link.scss';

interface Props {
  url: string;
}

export const Link = ({ url }: Props) => {
  return (
    <a className="lesson-page-link" href={url}>
      Test link
    </a>
  );
};
