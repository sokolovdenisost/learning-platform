import React from 'react';
import { Button } from '../Button/Button';
import './Block.scss';

interface Props {
  title?: string;
  subtitle?: string;
  children: JSX.Element | JSX.Element[];
  onSave?: () => void;
  width?: number | string;
}

export const Block = ({ title, subtitle, children, onSave, width = 410 }: Props) => {
  return (
    <div className="block" style={{ width }}>
      {title ? <div className="block-title">{title}</div> : null}
      {subtitle ? <div className="block-subtitle">{subtitle}</div> : null}
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
