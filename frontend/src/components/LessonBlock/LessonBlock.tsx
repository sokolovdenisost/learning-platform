import React from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { deleteLessonHandler } from '../../utils/course';
import { Button } from '../Button/Button';
import './LessonBlock.scss';

interface Props {
  title: string;
  _id: string;
  course: string;
  type: string | null;
}

export const LessonBlock = ({ title, _id, course, type }: Props) => {
  return (
    <div className="lesson-block">
      <div className="lesson-title">{title}</div>
      {type === 'edit' ? (
        <div className="lesson-buttons">
          <a href={`/edit/${course}/lesson/${_id}`}>
            <Button type="outline" color="primary" fontSize="14">
              Edit
            </Button>
          </a>
          <Button type="outline" color="danger" fontSize="14" onClick={() => deleteLessonHandler(course, _id)}>
            Delete
          </Button>
        </div>
      ) : (
        <IoMdArrowDropdown size="24" color="#b3b3c1" />
      )}
    </div>
  );
};
