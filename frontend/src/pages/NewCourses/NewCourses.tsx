import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardCourse } from '../../components/CardCourse/CardCourse';
import { Layout } from '../../components/Layout/Layout';
import { Loader } from '../../components/Loader/Loader';
import { API_URL } from '../../consts';
import { ICourse } from '../../interfaces/course';
import { getAllCourses } from '../../store/actions/coursesAction';
import './NewCourses.scss';

export const NewCourses = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state: any) => state.courses.allCourses);
  const loading = useSelector((state: any) => state.courses.loading);

  useEffect(() => {
    dispatch(getAllCourses());
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
