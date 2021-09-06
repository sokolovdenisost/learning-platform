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
  const [disable, setDisable] = useState(true);

  function onSave() {
    if (text) {
      setActiveEdit(false);
    }
  }

  useEffect(() => {
    console.log(text, disable);
  }, [text, disable]);

  function changeInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value);
    onChange(index, e.target.value);
    if (e.target.value) {
      console.log(e.target.value);
      setDisable(false);
    } else if (!e.target.value) {
      setDisable(true);
    }
  }

  function onEdit() {
    setActiveEdit(true);
  }

  return (
    <div className="textarea">
      {activeEdit ? (
        <CreateBlock title="Text course" disable={disable} onCancel={onCancel} onSave={onSave}>
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
