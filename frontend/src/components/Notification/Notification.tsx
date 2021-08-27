import React, { useState } from 'react';
import './Notification.scss';

interface Props {
  text: string;
  type: string;
}

export const Notification = ({ type, text }: Props) => {
  const [active, setActive] = useState(false);

  setTimeout(() => {
    setActive(true);
  }, 300);

  setTimeout(() => {
    setActive(false);
  }, 4700);

  return <div className={active ? `notification active ${type}` : `notification ${type}`}>{text}</div>;
};
