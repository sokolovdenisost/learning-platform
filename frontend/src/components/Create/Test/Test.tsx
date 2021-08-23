import React, { useState } from 'react';
import { Textarea } from '../../Textarea/Textarea';
import { CreateBlock } from '../CreateBlock/CreateBlock';
import './Test.scss';

interface Props {
  onCancel: () => void;
}

export const Test = ({ onCancel }: Props) => {
  const [value, setValue] = useState('');
  const [activeEdit, setActiveEdit] = useState(true);
  const [disable, setDisable] = useState(true);

  function onSave() {}

  function changeInput(e: React.ChangeEvent<HTMLTextAreaElement>) {}

  return (
    <div className="test">
      <CreateBlock title="Test course" onCancel={onCancel} onSave={onSave} disable={disable}>
        <div className="test-block">
          <div className="test-question">
            <Textarea placeholder="Test course" value={value} onChange={changeInput} />
          </div>
          <div className="test-answers"></div>
        </div>
      </CreateBlock>
    </div>
  );
};
