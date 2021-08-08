import React from 'react';
import { Button } from '../Button/Button';
import './Block.scss';

interface Props {
  title: string;
  subtitle: string;
  children: JSX.Element | JSX.Element[];
  onSave?: () => void;
}

export const Block = ({ title, subtitle, children, onSave }: Props) => {
  return (
    <div className="block">
      <div className="block-title">{title}</div>
      <div className="block-subtitle">{subtitle}</div>
      <div className="block-body">{children}</div>
      {onSave ? (
        <div className="block-footer">
          <Button type="bold" color="primary" fontSize="16" onClick={onSave}>
            Save
          </Button>
        </div>
      ) : null}
    </div>
  );
};
