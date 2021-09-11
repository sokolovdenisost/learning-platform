import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardCourseCreated } from '../../components/CardCourseCreated/CardCourseCreated';
import { Layout } from '../../components/Layout/Layout';
import { Loader } from '../../components/Loader/Loader';
import { Progress } from '../../components/Progress/Progress';
import { API_URL } from '../../consts';
import { ICourse } from '../../interfaces/course';
import { getMyCreatedCourses } from '../../store/actions/coursesAction';
import './MyCourses.scss';

export const MyCourses = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state: any) => state.courses);
  useEffect(() => {
    dispatch(getMyCreatedCourses());
  }, []);

  const mapCreatedCourses = courses.createdCourses.map((course: ICourse) => {
    return <CardCourseCreated course={course} key={course._id} />;
  });

  if (courses.loading) {
    return <Loader />;
  }

  return (
    <Layout title="My courses">
      <div className="my-courses-page">
        <div className="my-courses-learning">
          <div className="my-courses-title">My learning courses</div>
          {/* <Progress /> */}
          no courses
        </div>
        <div className="my-courses-created">
          <div className="my-courses-title">My created courses</div>
          {courses.createdCourses.length ? mapCreatedCourses : 'Not created courses'}
        </div>
      </div>
    </Layout>
  );
};
