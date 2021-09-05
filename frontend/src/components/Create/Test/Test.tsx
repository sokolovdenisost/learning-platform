import React, { useState } from 'react';
import { Button } from '../../Button/Button';
import { CreateModal } from '../../Modal/Modal';
import { CreateBlock } from '../CreateBlock/CreateBlock';
import './Test.scss';

interface Props {
  onCancel: () => void;
  onChange: any;
  index: number;
}

export const Test = ({ onCancel }: Props) => {
  const [questions, setQuestions] = useState<Questions[]>([]);
  const [activeEdit, setActiveEdit] = useState(true);
  const [createModal, setCreateModal] = useState({ type: '', active: false });
  const [disable, setDisable] = useState(true);

  function onSave() {}

  function changeInput(e: React.ChangeEvent<HTMLTextAreaElement>) {}

  return (
    <>
      <div className="test">
        <CreateBlock title="Test course" onCancel={onCancel} onSave={onSave} disable={disable}>
          <div className="test-block">
            <div className="test-questions-title">All questions</div>
            <div className="test-questions">{questions.length ? questions : <div className="test-questions-no">No questions</div>}</div>
            <div className="test-add-questions">
              <Button type="bold" color="success" fontSize="16" onClick={() => setCreateModal({ ...createModal, active: !createModal.active })}>
                Add question
              </Button>
            </div>
          </div>
        </CreateBlock>
      </div>
      {createModal.active ? <CreateModal modal={createModal} setModal={setCreateModal} /> : null}
    </>
  );
};

interface Questions {
  text: string;
  answers: Answers[];
}

interface Answers {
  text: string;
  right: boolean;
}
