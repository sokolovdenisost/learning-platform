import React, { useState } from 'react';
import { Button } from '../Button/Button';
import './Step.scss';

interface Props {
  children: JSX.Element | JSX.Element[];
  activeTransform: number;
  active: boolean;
  changeStep: (step: string, type: string) => void;
  step: string;
}

export const Step = ({ children, activeTransform, active, changeStep, step }: Props) => {
  function getActiveValues(active: boolean): GetStyle {
    if (active) {
      return {
        opacity: 1,
        scale: 1,
        visibility: 'visible',
      };
    }

    return {
      opacity: 0,
      scale: 0.8,
      visibility: 'hidden',
    };
  }

  return (
    <div
      className={active ? 'step' : 'step noactive'}
      style={{ transform: `translateX(${activeTransform}%) scale(${getActiveValues(active).scale})`, ...getActiveValues(active) }}>
      <div className="step-body">{children}</div>
      <div className="step-next">
        {step === '1' ? null : (
          <Button type="outline" color="primary" fontSize="16" onClick={() => changeStep(step, 'back')}>
            Back step
          </Button>
        )}
        <Button type="bold" color="primary" fontSize="16" onClick={() => changeStep(step, 'next')}>
          Next step
        </Button>
      </div>
    </div>
  );
};

interface GetStyle {
  scale: number;
  opacity: number;
  visibility: VisibilityState;
}
