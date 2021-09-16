import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../../../consts';
import { ICourse } from '../../../interfaces/course';
import { getMyCreatedCourses } from '../../../store/actions/coursesAction';
import { CardCourse } from '../../CardCourse/CardCourse';
import { Loader } from '../../Loader/Loader';
import './Created.scss';

export const Created = () => {
  const dispatch = useDispatch();
  const createdCourses = useSelector((state: any) => state.courses.createdCourses);
  const loading = useSelector((state: any) => state.courses.loading);
  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    dispatch(getMyCreatedCourses());
  }, [user_id]);

  const mapCreatedCourses = createdCourses.map((course: ICourse) => {
    return <CardCourse course={course} key={course._id} />;
  });

  if (loading) {
    return <Loader />;
  }

  return <div>{createdCourses.length ? mapCreatedCourses : 'No created courses'}</div>;
};
