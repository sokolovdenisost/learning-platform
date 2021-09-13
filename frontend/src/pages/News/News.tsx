import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '../../components/Layout/Layout';
import { Loader } from '../../components/Loader/Loader';
import { Slider } from '../../components/Slider/Slider';
import { API_URL } from '../../consts';
import { ICourse } from '../../interfaces/course';
import { getAllCourses } from '../../store/actions/coursesAction';
import './News.scss';

export const News = () => {
  const dispatch = useDispatch();
  const newCourses = useSelector((state: any) => state.courses.allCourses);
  const loading = useSelector((state: any) => state.courses.loading);
  newCourses.splice(5);

  useEffect(() => {
    dispatch(getAllCourses());
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
