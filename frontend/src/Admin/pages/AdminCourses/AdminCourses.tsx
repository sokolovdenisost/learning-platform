import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../../../components/Layout/Layout";
import { Loader } from "../../../components/Loader/Loader";
import { IState, IStateCourses } from "../../../interfaces/state";
import { getAllCourses } from "../../../store/actions/coursesAction";
import { Course } from "../../components/Course/Course";
import "./AdminCourses.scss";

export const AdminCourses = () => {
  const { allCourses, loading }: IStateCourses = useSelector((state: IState) => state.courses);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCourses());
  }, []);

  const mapCourses = allCourses.map((course) => <Course key={course._id} course={course} />);

  if (loading) {
    return <Loader />;
  }

  return (
    <Layout title="Courses">
      <div className="courses-page">{mapCourses}</div>
    </Layout>
  );
};
