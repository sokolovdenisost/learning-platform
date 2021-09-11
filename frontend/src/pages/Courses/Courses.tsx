import React, { useState, useEffect } from 'react';
import { CardCourse } from '../../components/CardCourse/CardCourse';
import { Filter } from '../../components/Filter/Filter';
import { Layout } from '../../components/Layout/Layout';
import { Loader } from '../../components/Loader/Loader';
import { API_URL } from '../../consts';
import { ICourse } from '../../interfaces/course';
import './Courses.scss';

export const Courses = () => {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/courses`)
      .then((res) => res.json())
      .then((res) => {
        setCourses(res.courses);
        setLoading(false);
      });
  }, []);

  const mapCourses = courses.map((course) => {
    return <CardCourse course={course} key={course._id} />;
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <Layout title="All courses">
      <div className="courses-page">
        <Filter />
        {mapCourses}
      </div>
    </Layout>
  );
};
