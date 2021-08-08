import React from 'react';
import { Button } from '../Button/Button';
import './Block.scss';

interface Props {
  title: string;
  subtitle: string;
  children: JSX.Element | JSX.Element[];
  onClick?: () => void;
}

export const Block = ({ title, subtitle, children, onClick }: Props) => {
  return (
    <div className="block">
      <div className="block-title">{title}</div>
      <div className="block-subtitle">{subtitle}</div>
      <div className="block-body">{children}</div>
      {onClick ? (
        <div className="block-footer">
          <Button type="bold" color="primary" fontSize="16">
            Save
          </Button>
        </div>
      ) : null}
    </div>
  );
};
