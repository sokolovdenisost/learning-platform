import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button } from '../Button/Button';
import { Code } from '../Create/Code/Code';
import { Panel } from '../Create/Panel/Panel';
import { Test } from '../Create/Test/Test';
import { Text } from '../Create/Text/Text';
import { Title } from '../Create/Title/Title';
import { Video } from '../Create/Video/Video';
import { CreateModal } from '../Modal/Modal';
import './Step.scss';

interface Props {
  children?: JSX.Element | JSX.Element[];
  activeTransform: number;
  active: boolean;
  changeStep: (step: string, type: string) => void;
  step: string;
  type: Types;
}

type Types = 'normal' | 'lesson';
type TypesForm = 'video' | 'text' | 'test' | 'code' | 'title';

export const Step = ({ children, activeTransform, active, changeStep, step, type }: Props) => {
  const [stepForm, setStepForm] = useState<StepForm[]>([]);
  const [createModal, setCreateModal] = useState({ type: '', active: false });
  const styleTypeNormal = {
    display: type === 'normal' ? 'flex' : 'block',
    justifyContent: type === 'normal' ? 'space-between' : '',
  };

  function createForm(type: TypesForm) {
    setStepForm([...stepForm, { type, value: '' }]);
  }

  function cancelForm(index: number) {
    console.log(index);
    setStepForm([...stepForm.filter((_, idx) => index !== idx)]);
  }

  useEffect(() => {
    console.log(stepForm);
  }, [stepForm]);

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

  const mapCreateForms = stepForm.map((form, index) => {
    if (form.type === 'text') {
      return <Text onCancel={() => cancelForm(index)} key={index} />;
    }
    if (form.type === 'video') {
      return <Video onCancel={() => cancelForm(index)} key={index} />;
    }

    if (form.type === 'title') {
      return <Title onCancel={() => cancelForm(index)} key={index} />;
    }

    if (form.type === 'test') {
      console.log(index, 'test');
      return <Test onOpen={() => setCreateModal({ ...createModal, active: !createModal.active })} onCancel={() => cancelForm(index)} key={index} />;
    }

    if (form.type === 'code') {
      return <Code onCancel={() => cancelForm(index)} key={index} />;
    }
  });

  return (
    <>
      <div
        className={active ? 'step' : 'step noactive'}
        style={{ transform: `translateX(${activeTransform}%) scale(${getActiveValues(active).scale})`, ...getActiveValues(active) }}>
        <div className="step-body" style={styleTypeNormal}>
          {type === 'normal' ? (
            children
          ) : (
            <>
              {mapCreateForms}
              <Panel onCreate={createForm} />{' '}
            </>
          )}
        </div>
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
      {createModal.active ? <CreateModal modal={createModal} setModal={setCreateModal} /> : null}
    </>
  );
};

interface GetStyle {
  scale: number;
  opacity: number;
  visibility: VisibilityState;
}

interface StepForm {
  [key: string]: any;
}
