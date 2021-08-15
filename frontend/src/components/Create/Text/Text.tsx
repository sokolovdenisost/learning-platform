import React, { useState } from 'react';
import { Button } from '../../Button/Button';
import './Text.scss';

interface Props {
  onCancel: () => void;
}

export const Text = ({ onCancel }: Props) => {
  const [value, setValue] = useState('');
  const [active, setActive] = useState(false);
  const [activeEdit, setActiveEdit] = useState(true);

  setTimeout(() => {
    setActive(true);
  }, 0);

  function onSave() {
    setActiveEdit(false);
  }

  return (
    <>
      {activeEdit ? (
        <div className={active ? 'textarea active' : 'textarea'}>
          <div className="textarea-title">Text course</div>
          <textarea defaultValue="" placeholder="Text course" onChange={(e) => setValue(e.target.value)}></textarea>
          <div className="textarea-buttons">
            <Button type="outline" color="cancel" fontSize="14" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="bold" color="primary" fontSize="14" onClick={onSave}>
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="ready-textcourse">{value}</div>
      )}
    </>
  );
};
