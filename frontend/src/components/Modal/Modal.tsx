import React, { useState } from 'react';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Textarea } from '../Textarea/Textarea';
import './Modal.scss';

interface Props {
  modal: IModal;
  setModal: React.Dispatch<React.SetStateAction<IModal>>;
  title?: string;
  children?: JSX.Element | JSX.Element[];
  onClick?: () => void;
}

export const Modal = ({ modal, setModal, title, children }: Props) => {
  const [activeModal, setActiveModal] = useState(false);
  setTimeout(() => setActiveModal(true), 0);

  function closeModal() {
    setActiveModal(false);
    setModal({ ...modal, active: !modal.active });
  }

  return (
    <div className={activeModal ? 'modal-overlay active' : 'modal-overlay'} onClick={closeModal}>
      <div className={activeModal ? 'modal-block active' : 'modal-block'} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">{title}</div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer"></div>
      </div>
    </div>
  );
};

interface IModal {
  type: string;
  active: boolean;
}

export const SignInModal = ({ modal, setModal }: Props) => {
  return (
    <Modal title="Sign In" modal={modal} setModal={setModal}>
      <div className="sign-in-form">
        <Input label="Email address" id="email" />
        <Input label="Password" id="password" />
      </div>
      <Button type="bold" color="main" fontSize="14" width="100%">
        Sign in
      </Button>
    </Modal>
  );
};

export const SignUpModal = ({ modal, setModal }: Props) => {
  return (
    <Modal title="Sign up" modal={modal} setModal={setModal}>
      <div className="sign-up-form">
        <Input label="First name" id="firstName" />
        <Input label="Last name" id="lastName" />
        <Input label="Email address" id="email" />
        <Input label="Password" id="password" />
      </div>
      <Button type="bold" color="main" fontSize="14" width="100%">
        Sign up
      </Button>
    </Modal>
  );
};

export const CreateModal = ({ modal, setModal }: ICreateModal) => {
  const [data, setData] = useState({
    text: '',
    answers: [{ text: '' }],
  });
  return (
    <Modal title="Create question" modal={modal} setModal={setModal}>
      <div className="create-question-form">
        <Input label="Question text" id="questionText" />
        <div className="question-answers">
          <div className="question-answers-title">Answers for question</div>
          <Input label="Answer #1" id="answer#1" />
          <Input label="Answer #2" id="answer#2" />
          <Input label="Answer #3" id="answer#3" />
          <Input label="Answer #4" id="answer#4" />
        </div>
      </div>
      <Button type="bold" color="main" fontSize="14" width="100%">
        Create question
      </Button>
    </Modal>
  );
};

interface ICreateModal {
  modal: IModal;
  setModal: React.Dispatch<React.SetStateAction<IModal>>;
  title?: string;
  children?: JSX.Element | JSX.Element[];
}
