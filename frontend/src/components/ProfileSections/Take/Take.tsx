import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ICourse } from '../../../interfaces/course';
import { IState, IStateCourses } from '../../../interfaces/state';
import { getTakeCourses } from '../../../store/actions/coursesAction';
import { CardCourse } from '../../CardCourse/CardCourse';
import { LoaderSection } from '../../Loader/Loader';
import './Take.scss';

interface Props {
  id: string;
}

export const Take = ({ id }: Props) => {
  const dispatch = useDispatch();
  const courses: IStateCourses = useSelector((state: IState) => state.courses);

  useEffect(() => {
    dispatch(getTakeCourses(id));
  }, []);

  const mapTakeCourses = courses.takeCourses.map((course: ITakeCourse) => <CardCourse course={course.course} key={course._id} />);

  if (courses.loading) {
    return <LoaderSection />;
  }

  return <div>{courses.takeCourses.length ? mapTakeCourses : 'No take courses'}</div>;
};

interface ITakeCourse {
  course: ICourse;
  _id: string;
  currentLesson: number;
}
