import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardCourse } from '../../components/CardCourse/CardCourse';
import { Layout } from '../../components/Layout/Layout';
import { Loader } from '../../components/Loader/Loader';
import { API_URL } from '../../consts';
import { ICourse } from '../../interfaces/course';
import { IState, IStateCourses } from '../../interfaces/state';
import { getAllCourses } from '../../store/actions/coursesAction';
import './NewCourses.scss';

export const NewCourses = () => {
  const dispatch = useDispatch();
  const { allCourses, loading }: IStateCourses = useSelector((state: IState) => state.courses);

  useEffect(() => {
    dispatch(getAllCourses());
  }, []);

  const mapCourses = allCourses.map((course: ICourse) => {
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
