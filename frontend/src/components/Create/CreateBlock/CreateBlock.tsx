import React, { useState } from 'react';
import './CreateBlock.scss';

interface Props {
  children: JSX.Element | JSX.Element[];
  title: string;
}

export const CreateBlock = ({ title, children }: Props) => {
  const [active, setActive] = useState(false);

  setTimeout(() => {
    setActive(true);
  }, 0);

  return (
    <div className={active ? 'create-block active' : 'create-block'}>
      <div className="create-block-title">{title}</div>
      {children}
    </div>
  );
};
