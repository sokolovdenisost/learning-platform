import React, { useEffect, useState } from 'react';
import { API_URL } from '../../../consts';
import { ICourse } from '../../../interfaces/course';
import { CardCourse } from '../../CardCourse/CardCourse';
import './Created.scss';

export const Created = () => {
  const [createdCourses, setCreatedCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState(true);
  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    try {
      fetch(`${API_URL}/courses/${user_id}`)
        .then((res) => res.json())
        .then((res) => {
          setCreatedCourses(res.courses);
          setLoading(false);
        });
    } catch (error) {
      throw error;
    }
  }, [user_id]);

  const mapCreatedCourses = createdCourses.map((course) => {
    return <CardCourse course={course} key={course._id} />;
  });

  return <div>{mapCreatedCourses}</div>;
};
