import React from 'react';
import { ICourse } from '../../../interfaces/course';
import { Button } from '../../Button/Button';
import { Modal } from '../../Modal/Modal';
import './WatchAnotherLesson.scss';

interface Props {
  active: IModal;
  setActive: React.Dispatch<React.SetStateAction<IModal>>;
  course: ICourse;
  currentLesson: number;
}

export const WatchAnotherLesson = ({ active, setActive, course, currentLesson }: Props) => {
  const user_id = localStorage.getItem('user_id');
  const mapLessons = course.lessons.map((lesson, index) => {
    if (course.owner._id === user_id) {
      return (
        <a key={lesson} href={`/lesson/${lesson}`} style={{ display: 'block' }}>
          <Button type="bold" color="primary" fontSize="14" width="100%">
            {index + 1}
          </Button>
        </a>
      );
    } else {
      const check = course.lessons.findIndex((l) => course.lessons[currentLesson - 1] === l);
      if (index <= check) {
        return (
          <a key={lesson} href={`/lesson/${lesson}`} style={{ display: 'block' }}>
            <Button type="bold" color="primary" fontSize="14" width="100%">
              {index + 1}
            </Button>
          </a>
        );
      }
      return (
        <Button key={lesson} disable={true} type="bold" color="primary" fontSize="14">
          {index + 1}
        </Button>
      );
    }
  });

  return (
    <Modal title="Another lessons" modal={active} setModal={setActive}>
      <div className="another-lessons">{mapLessons}</div>
    </Modal>
  );
};

interface IModal {
  type: string;
  active: boolean;
}
