import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../components/Button/Button";
import { Layout } from "../../../components/Layout/Layout";
import { Loader } from "../../../components/Loader/Loader";
import { IState, IStateAdmin, IStateCourses } from "../../../interfaces/state";
import { getAllCourses } from "../../../store/actions/coursesAction";
import { getAllUsers, getBanUsers, getProvenCourses, getUntestedCourses } from "../../../store/actions/adminAction";
import { Dashboard } from "../../components/Dashboard/Dashboard";
import "./Admin.scss";

export const Admin = () => {
  const courses: IStateCourses = useSelector((state: IState) => state.courses);
  const admin: IStateAdmin = useSelector((state: IState) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getBanUsers());
    dispatch(getAllCourses());
    dispatch(getUntestedCourses());
    dispatch(getProvenCourses());
  }, []);

  if (courses.loading && admin.loading) {
    return <Loader />;
  }

  return (
    <Layout title="Admin">
      <div className="admin-page">
        <div className="admin-page-dashboards">
          <Dashboard text="Users" count={admin.users.length} href="/admin/users" />
          <Dashboard text="Ban users" count={admin.banUsers.length} href="/admin/ban-users" />
          <Dashboard text="Courses" count={courses.allCourses.length} href="/admin/courses" />
          <Dashboard text="Untested courses" count={admin.untestedCourses.length} href="/admin/untested-courses" />
          <Dashboard text="Proven courses" count={admin.provenCourses.length} href="/admin/proven-courses" />
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
