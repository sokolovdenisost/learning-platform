import React, { useState } from 'react';
import { useEffect } from 'react';
import { BiEdit } from 'react-icons/bi';
import { Button } from '../../Button/Button';
import { Textarea } from '../../Textarea/Textarea';
import { CreateBlock } from '../CreateBlock/CreateBlock';
import './Text.scss';

interface Props {
  onCancel: () => void;
  onChange: (index: number, body: string) => void;
  index: number;
  value: string;
}

export const Text = ({ onCancel, onChange, index, value }: Props) => {
  const [text, setText] = useState(value);
  const [activeEdit, setActiveEdit] = useState(true);

  function onSave() {
    setActiveEdit(false);
  }

  function changeInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value);
    onChange(index, e.target.value);
  }

  function onEdit() {
    setActiveEdit(true);
  }

  return (
    <div className="textarea">
      {activeEdit ? (
        <CreateBlock title="Text course" disable={text ? false : true} onCancel={onCancel} onSave={onSave}>
          <Textarea placeholder="Text course" value={text} onChange={changeInput} />
        </CreateBlock>
      ) : (
        <div className="textarea-ready">
          <div className="ready-textcourse">{text}</div>
          <div className="ready-edit" onClick={onEdit}>
            <BiEdit size={24} color="#007bff" />
          </div>
        </div>
      )}
    </div>
  );
};
