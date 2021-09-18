import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '../../components/Layout/Layout';
import { Loader } from '../../components/Loader/Loader';
import { Slider } from '../../components/Slider/Slider';
import { API_URL } from '../../consts';
import { ICourse } from '../../interfaces/course';
import { IState, IStateCourses } from '../../interfaces/state';
import { getAllCourses } from '../../store/actions/coursesAction';
import { useTranslation } from 'react-i18next';
import './News.scss';

export const News = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { allCourses, loading }: IStateCourses = useSelector((state: IState) => state.courses);
  allCourses.splice(5);

  useEffect(() => {
    dispatch(getAllCourses());
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Layout title="News">
      <Slider courses={allCourses} title="New courses" link="/new-courses" />
      {/* <Slider title="Most popular courses" link="/popular-courses" /> */}
    </Layout>
  );
};
