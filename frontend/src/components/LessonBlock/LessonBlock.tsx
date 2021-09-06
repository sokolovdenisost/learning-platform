import React from 'react';
import { Button } from '../Button/Button';
import './LessonBlock.scss';

interface Props {
  title: string;
  _id: string;
  course: string;
}

export const LessonBlock = ({ title, _id, course }: Props) => {
  return (
    <div className="lesson-block">
      <div className="lesson-title">{title}</div>
      <div className="lesson-buttons">
        <a href={`/edit/${course}/lesson/${_id}`}>
          <Button type="bold" color="primary" fontSize="14">
            Edit
          </Button>
        </a>
        <Button type="outline" color="danger" fontSize="14">
          Delete
        </Button>
      </div>
    </div>
  );
};
