import React, { useState } from 'react';
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

  return (
    <div className="test">
      <CreateBlock title="Test course" onCancel={onCancel} onSave={onSave} disable={disable}>
        <div>test</div>
      </CreateBlock>
    </div>
  );
};
