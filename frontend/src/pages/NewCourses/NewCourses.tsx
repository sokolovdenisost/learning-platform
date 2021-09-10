import React, { useState, useEffect } from 'react';
import { CardCourse } from '../../components/CardCourse/CardCourse';
import { Layout } from '../../components/Layout/Layout';
import { Loader } from '../../components/Loader/Loader';
import { API_URL } from '../../consts';
import { ICourse } from '../../interfaces/course';
import './NewCourses.scss';

export const NewCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/courses`)
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        setCourses(res.courses);
      });
  }, []);

  const mapCourses = courses.map((course: ICourse) => {
    return <CardCourse key={course._id} course={course} />;
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <Layout title="New courses">
      <div className="new-courses-page">{mapCourses}</div>
    </Layout>
  );
};
