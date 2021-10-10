import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../../../components/Layout/Layout";
import { Loader } from "../../../components/Loader/Loader";
import { IState, IStateAdmin, IStateCourses } from "../../../interfaces/state";
import { getProvenCourses } from "../../../store/actions/adminAction";
import { Course } from "../../components/Course/Course";
import "./AdminProvenCourses.scss";

export const AdminProvenCourses = () => {
  const { provenCourses, loading }: IStateAdmin = useSelector((state: IState) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProvenCourses());
  }, []);

  const mapProvenCourses = provenCourses.map((course) => <Course key={course._id} course={course} />);

  if (loading) {
    return <Loader />;
  }

  return (
    <Layout title="Proven courses">
      <div className="proven-courses-page">{provenCourses.length ? mapProvenCourses : "No proven courses"}</div>
    </Layout>
  );
};
