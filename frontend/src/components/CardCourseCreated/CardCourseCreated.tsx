import React from 'react';
import { ICourse } from '../../interfaces/course';
import { deleteCourseHandler } from '../../utils/course';
import { Button } from '../Button/Button';
import { CardCourse } from '../CardCourse/CardCourse';
import './CardCourseCreated.scss';

interface Props {
  course: ICourse;
}

export const CardCourseCreated = ({ course }: Props) => {
  return (
    <div className="card-course-created">
      <CardCourse course={course} />
      <div className="course-buttons">
        <a className="course-button-edit" href={`/edit/${course._id}`}>
          <Button type="bold" color="primary" fontSize="16" width="100%">
            Edit course
          </Button>
        </a>
        <Button type="bold" color="danger" fontSize="16" onClick={() => deleteCourseHandler(course._id)}>
          Delete course
        </Button>
      </div>
    </div>
  );
};
