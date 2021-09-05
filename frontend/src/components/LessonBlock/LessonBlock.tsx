import React from 'react';
import { Button } from '../Button/Button';
import './LessonBlock.scss';

export const LessonBlock = () => {
  const id = '123123';
  const less_id = '213445';
  return (
    <div className="lesson-block">
      <div className="lesson-title">Title</div>
      <div className="lesson-buttons">
        <a href={`/edit/${id}/lesson/${less_id}`}>
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
