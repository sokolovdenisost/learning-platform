import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ICourse } from '../../../interfaces/course';
import { getMyTakeCourses } from '../../../store/actions/coursesAction';
import { CardCourse } from '../../CardCourse/CardCourse';
import { Loader } from '../../Loader/Loader';
import './Take.scss';

export const Take = () => {
  const dispatch = useDispatch();
  const takeCourses = useSelector((state: any) => state.courses.takeCourses);
  const loading = useSelector((state: any) => state.courses.loading);

  useEffect(() => {
    dispatch(getMyTakeCourses());
  }, []);

  const mapTakeCourses = takeCourses.map((course: ITakeCourse) => {
    console.log('course', course);
    return <CardCourse course={course.course} key={course._id} />;
  });

  if (loading) {
    return <Loader />;
  }

  return <div>{takeCourses.length ? mapTakeCourses : 'No take courses'}</div>;
};

interface ITakeCourse {
  course: ICourse;
  _id: string;
  currentLesson: number;
}
