import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/Layout/Layout';
import { Loader } from '../../components/Loader/Loader';
import { Slider } from '../../components/Slider/Slider';
import { API_URL } from '../../consts';
import { ICourse } from '../../interfaces/course';
import './News.scss';

export const News = () => {
  const [newCourses, setNewCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/courses`)
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        console.log(res);
        setNewCourses(res.courses);
        newCourses.splice(5);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Layout title="News">
      <Slider courses={newCourses} title="New courses" link="/new-courses" />
      {/* <Slider title="Most popular courses" link="/popular-courses" /> */}
    </Layout>
  );
};
