import React, { useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { Button } from '../../Button/Button';
import { Input } from '../../Input/Input';
import { CreateBlock } from '../CreateBlock/CreateBlock';
import './Title.scss';

interface Props {
  onCancel: () => void;
  onChange: (index: number, body: string) => void;
  index: number;
  value: string;
}

export const Title = ({ onCancel, onChange, index, value }: Props) => {
  const [text, setText] = useState(value);
  const [activeEdit, setActiveEdit] = useState(true);

  function onSave() {
    setActiveEdit(false);
  }

  function changeInput(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
    onChange(index, e.currentTarget.value);
  }

  function onEdit() {
    setActiveEdit(true);
  }

  return (
    <div className="title">
      {activeEdit ? (
        <CreateBlock title="Title course" disable={text ? false : true} onSave={onSave} onCancel={onCancel}>
          <Input value={text} label="" id="title" onChange={changeInput} />
        </CreateBlock>
      ) : (
        <div className="title-ready">
          <div className="title-value">{text}</div>
          <div className="title-edit" onClick={onEdit}>
            <BiEdit size={24} color="#007bff" />
          </div>
        </div>
      )}
    </div>
  );
};
