import React, { useState } from 'react';
import { useEffect } from 'react';
import { BiEdit } from 'react-icons/bi';
import { Button } from '../../Button/Button';
import { CreateBlock } from '../CreateBlock/CreateBlock';
import './Text.scss';

interface Props {
  onCancel: () => void;
}

export const Text = ({ onCancel }: Props) => {
  const [value, setValue] = useState('');
  const [active, setActive] = useState(false);
  const [activeEdit, setActiveEdit] = useState(true);
  const [disable, setDisable] = useState(true);

  setTimeout(() => {
    setActive(true);
  }, 0);

  function onSave() {
    if (value) {
      setActiveEdit(false);
    }
  }

  useEffect(() => {
    console.log(value, disable);
  }, [value, disable]);

  function changeInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(e.target.value);
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
        <CreateBlock title="Text course">
          <textarea defaultValue={value} placeholder="Text course" onChange={(e) => changeInput(e)}></textarea>
          <div className="textarea-buttons">
            <Button type="outline" color="cancel" fontSize="14" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="bold" color="primary" fontSize="14" onClick={onSave} disable={disable}>
              Save
            </Button>
          </div>
        </CreateBlock>
      ) : (
        <div className="textarea-ready">
          <div className="ready-textcourse">{value}</div>
          <div className="ready-edit" onClick={onEdit}>
            <BiEdit size={24} color="#007bff" />
          </div>
        </div>
      )}
    </div>
  );
};
