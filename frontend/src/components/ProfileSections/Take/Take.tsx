import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ICourse } from '../../../interfaces/course';
import { getTakeCourses } from '../../../store/actions/coursesAction';
import { CardCourse } from '../../CardCourse/CardCourse';
import { LoaderSection } from '../../Loader/Loader';
import './Take.scss';

interface Props {
  id: string;
}

export const Take = ({ id }: Props) => {
  const dispatch = useDispatch();
  const takeCourses = useSelector((state: any) => state.courses.takeCourses);
  const loading = useSelector((state: any) => state.courses.loading);

  useEffect(() => {
    dispatch(getTakeCourses(id));
  }, []);

  const mapTakeCourses = takeCourses.map((course: ITakeCourse) => <CardCourse course={course.course} key={course._id} />);

  if (loading) {
    return <LoaderSection />;
  }

  return <div>{takeCourses.length ? mapTakeCourses : 'No take courses'}</div>;
};

interface ITakeCourse {
  course: ICourse;
  _id: string;
  currentLesson: number;
}
