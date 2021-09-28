import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../../consts";
import { ICourse } from "../../../interfaces/course";
import { IState, IStateCourses } from "../../../interfaces/state";
import { getCreatedCourses } from "../../../store/actions/coursesAction";
import { CardCourse } from "../../CardCourse/CardCourse";
import { Loader } from "../../Loader/Loader";
import "./Created.scss";

interface Props {
  id: string;
}

export const Created = ({ id }: Props) => {
  const dispatch = useDispatch();
  const { createdCourses, loading }: IStateCourses = useSelector((state: IState) => state.courses);

  useEffect(() => {
    dispatch(getCreatedCourses(id));
  }, []);

  const mapCreatedCourses = createdCourses.map((course: ICourse) => {
    return <CardCourse course={course} key={course._id} />;
  });

  if (loading) {
    return <Loader />;
  }

  return <div>{createdCourses.length ? mapCreatedCourses : "No created courses"}</div>;
};
