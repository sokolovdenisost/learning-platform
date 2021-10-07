import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../components/Button/Button";
import { Layout } from "../../../components/Layout/Layout";
import { Loader } from "../../../components/Loader/Loader";
import { IState, IStateCourses, IStateUser } from "../../../interfaces/state";
import { getAllCourses, getProvenCourses, getUntestedCourses } from "../../../store/actions/coursesAction";
import { getAllUsers } from "../../../store/actions/userAction";
import { Dashboard } from "../../components/Dashboard/Dashboard";
import "./Admin.scss";

export const Admin = () => {
  const courses: IStateCourses = useSelector((state: IState) => state.courses);
  const users: IStateUser = useSelector((state: IState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllCourses());
    dispatch(getUntestedCourses());
    dispatch(getProvenCourses());
  }, []);

  if (courses.loading && users.loading) {
    return <Loader />;
  }

  return (
    <Layout title="Admin">
      <div className="admin-page">
        <div className="admin-page-dashboards">
          <Dashboard text="Users" count={users.users.length} href="/admin/users" />
          <Dashboard text="Courses" count={courses.allCourses.length} href="/admin/courses" />
          <Dashboard text="Untested courses" count={courses.untestedCourses.length} href="/admin/untested-courses" />
          <Dashboard text="Proven courses" count={courses.provenCourses.length} href="/admin/proven-courses" />
        </div>
        <div className="admin-page-buttons">
          <div className="admin-title">Admin buttons</div>
          <div className="admin-buttons">
            <Button type="bold" color="main" fontSize="16">
              Delete no use images
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
