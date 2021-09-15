import React from 'react';
import { Modal } from '../../Modal/Modal';
import './WatchAnotherLesson.scss';

interface Props {
  active: IModal;
  setActive: React.Dispatch<React.SetStateAction<IModal>>;
}

export const WatchAnotherLesson = ({ active, setActive }: Props) => {
  return (
    <Modal title="Another lessons" modal={active} setModal={setActive}>
      <div className="another-lessons">
        <div className="another-lesson">1</div>
        <div className="another-lesson">2</div>
        <div className="another-lesson">3</div>
        <div className="another-lesson">4</div>
        <div className="another-lesson">5</div>
        <div className="another-lesson">6</div>
        <div className="another-lesson">7</div>
        <div className="another-lesson">8</div>
        <div className="another-lesson">9</div>
        <div className="another-lesson">10</div>
      </div>
    </Modal>
  );
};

interface IModal {
  type: string;
  active: boolean;
}
