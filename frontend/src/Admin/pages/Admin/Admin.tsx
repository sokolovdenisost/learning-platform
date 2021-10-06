import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../../../components/Layout/Layout";
import { Loader } from "../../../components/Loader/Loader";
import { IState, IStateCourses, IStateUser } from "../../../interfaces/state";
import { getAllCourses } from "../../../store/actions/coursesAction";
import { getAllUsers } from "../../../store/actions/userAction";
import { Dashboard } from "../../components/Dashboard/Dashboard";
import "./Admin.scss";

export const Admin = () => {
  const courses: IStateCourses = useSelector((state: IState) => state.courses);
  const users: IStateUser = useSelector((state: IState) => state.user);
  const dispatch = useDispatch();

  console.log(users);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllCourses());
  }, []);

  if (courses.loading && users.loading) {
    return <Loader />;
  }

  return (
    <Layout title="Admin">
      <div className="admin-page">
        <Dashboard text="Users" count={users.users.length} href="/admin/users" />
        <Dashboard text="Courses" count={courses.allCourses.length} href="/admin/courses" />
        <Dashboard text="Untested courses" count={courses.allCourses.length} href="/admin/courses" />
        <Dashboard text="Proven courses" count={courses.allCourses.length} href="/admin/courses" />
      </div>
    </Layout>
  );
};
