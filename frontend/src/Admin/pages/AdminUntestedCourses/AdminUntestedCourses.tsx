import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../../../components/Layout/Layout";
import { Loader } from "../../../components/Loader/Loader";
import { IState, IStateCourses } from "../../../interfaces/state";
import { getUntestedCourses } from "../../../store/actions/coursesAction";
import { Course } from "../../components/Course/Course";
import "./AdminUntestedCourses.scss";

export const AdminUntestedCourses = () => {
  const { untestedCourses, loading }: IStateCourses = useSelector((state: IState) => state.courses);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUntestedCourses());
  }, []);

  const mapUntestedCourses = untestedCourses.map((course) => <Course key={course._id} course={course} />);

  if (loading) {
    return <Loader />;
  }

  return (
    <Layout title="Untested courses">
      <div className="untested-courses-page">{untestedCourses.length ? mapUntestedCourses : "No untested courses"}</div>
    </Layout>
  );
};
