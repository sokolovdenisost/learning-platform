import React from 'react';
import { Button } from '../Button/Button';
import { Tag } from '../Tag/Tag';
import './CardCourseCreated.scss';

export const CardCourseCreated = () => {
  return (
    <div className="card-course-created">
      <img
        src="https://images.unsplash.com/photo-1553272725-086100aecf5e?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        alt=""
        className="course-image"
      />
      <div className="course-info">
        <div className="course-title">Strategy, Design, Development</div>
        <div className="course-description">Learn how to apply User Experience (UX) principles to your website designs, code ...</div>
        <div className="course-tags">
          <Tag title="UX Design" />
          <Tag title="UI Design" />
        </div>
      </div>
      <div className="course-buttons">
        <a className="course-button-edit" href="/edit/1">
          <Button type="bold" color="primary" fontSize="16" width="100%">
            Edit course
          </Button>
        </a>
        <Button type="bold" color="danger" fontSize="16">
          Delete course
        </Button>
      </div>
    </div>
  );
};
