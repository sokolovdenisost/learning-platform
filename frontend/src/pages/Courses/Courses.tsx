import React, { useState, useEffect } from 'react';
import { CardCourse } from '../../components/CardCourse/CardCourse';
import { Filter } from '../../components/Filter/Filter';
import { Layout } from '../../components/Layout/Layout';
import { API_URL } from '../../consts';
import { ICourse } from '../../interfaces/course';
import './Courses.scss';

export const Courses = () => {
  const [courses, setCourses] = useState<ICourse[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/courses`)
      .then((res) => res.json())
      .then((res) => {
        setCourses(res.courses);
      });
  }, []);

  const mapCourses = courses.map((course) => {
    return <CardCourse course={course} key={course._id} />;
  });

  return (
    <Layout title="All courses">
      <div className="courses-page">
        <Filter />
        {mapCourses}
      </div>
    </Layout>
  );
};
