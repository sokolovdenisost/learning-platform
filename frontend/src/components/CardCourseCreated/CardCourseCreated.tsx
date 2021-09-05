import React from 'react';
import { deleteCourseHandler } from '../../utils/course';
import { Button } from '../Button/Button';
import { Tag } from '../Tag/Tag';
import './CardCourseCreated.scss';

interface Props {
  course: ICourse;
}

export const CardCourseCreated = ({ course }: Props) => {
  const mapTags = course.tags.map((tag) => {
    return <Tag title={tag} key={tag} />;
  });
  return (
    <div className="card-course-created">
      <img src={course.image} alt="" className="course-image" />
      <div className="course-info">
        <div className="course-title">{course.title}</div>
        <div className="course-description">{course.description}</div>
        <div className="course-tags">{mapTags}</div>
      </div>
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

interface ICourse {
  _id: string;
  tags: string[];
  level: string;
  certificate: boolean;
  description: string;
  title: string;
  image: string;
  owner: string;
}
