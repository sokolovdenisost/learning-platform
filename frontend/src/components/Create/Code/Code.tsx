import React, { useState } from 'react';
import { CreateBlock } from '../CreateBlock/CreateBlock';
import './Code.scss';

interface Props {
  onCancel: () => void;
}

export const Code = ({ onCancel }: Props) => {
  const [value, setValue] = useState('');
  const [activeEdit, setActiveEdit] = useState(true);
  const [disable, setDisable] = useState(true);

  function onSave() {}

  return (
    <div className="code">
      <CreateBlock title="Code course" onSave={onSave} onCancel={onCancel} disable={disable}>
        <div>code</div>
      </CreateBlock>
    </div>
  );
};
