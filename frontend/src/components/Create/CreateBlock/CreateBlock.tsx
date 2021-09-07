import React, { useState } from 'react';
import { Button } from '../../Button/Button';
import './CreateBlock.scss';

interface Props {
  children: JSX.Element | JSX.Element[];
  title: string;
  onSave: () => void;
  onCancel: () => void;
  disable: boolean;
}

export const CreateBlock = ({ title, children, onCancel, onSave, disable }: Props) => {
  const [active, setActive] = useState(false);

  // setTimeout(() => {
  //   setActive(true);
  // }, 0);

  return (
    // <div className={active ? 'create-block active' : 'create-block'}>
    <div className="create-block active">
      <div className="create-block-title">{title}</div>
      {children}
      <div className="create-block-buttons">
        <Button type="outline" color="primary" fontSize="14" onClick={onSave} disable={disable}>
          Preview
        </Button>
        <Button type="outline" color="danger" fontSize="14" onClick={onCancel}>
          Delete
        </Button>
      </div>
    </div>
  );
};
