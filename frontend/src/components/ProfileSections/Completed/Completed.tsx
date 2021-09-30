import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IState, IStateCourses } from "../../../interfaces/state";
import { getCompletedCourses } from "../../../store/actions/coursesAction";
import { CardCourse } from "../../CardCourse/CardCourse";
import { LoaderSection } from "../../Loader/Loader";
import "./Completed.scss";

interface Props {
  id: string;
}

export const Completed = ({ id }: Props) => {
  const dispatch = useDispatch();
  const { completedCourses, loading }: IStateCourses = useSelector((state: IState) => state.courses);

  useEffect(() => {
    dispatch(getCompletedCourses(id));
  }, []);

  const mapCompletedCourses = completedCourses.map((course) => {
    return <CardCourse course={course} key={course._id} />;
  });

  if (loading || !completedCourses.length) {
    return <LoaderSection />;
  }

  return <div>{completedCourses.length ? mapCompletedCourses : 'No completed courses'}</div>;
};
