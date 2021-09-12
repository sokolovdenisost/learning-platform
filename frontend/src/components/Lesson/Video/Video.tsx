import React from 'react';
import './Video.scss';

interface Props {
  url: string;
}

export const Video = ({ url }: Props) => {
  return (
    <iframe
      className="lesson-page-video"
      allowFullScreen
      width="100%"
      height="450px"
      style={{ minHeight: '100%' }}
      src={`https://www.youtube.com/embed/${url}`}
    />
  );
};
