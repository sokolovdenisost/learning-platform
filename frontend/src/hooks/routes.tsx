import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { Admin } from "../Admin/pages/Admin/Admin";
import { AdminBanUsers } from "../Admin/pages/AdminBanUsers/AdminBanUsers";
import { AdminCourses } from "../Admin/pages/AdminCourses/AdminCourses";
import { AdminProvenCourses } from "../Admin/pages/AdminProvenCourses/AdminProvenCourses";
import { AdminUntestedCourses } from "../Admin/pages/AdminUntestedCourses/AdminUntestedCourses";
import { AdminUsers } from "../Admin/pages/AdminUsers/AdminUsers";

import { Loader } from "../components/Loader/Loader";
import { Navigator } from "../components/Navigator/Navigator";
import { Error404 } from "../pages/404/404";
import { Course } from "../pages/Course/Course";
import { Courses } from "../pages/Courses/Courses";
import { Create } from "../pages/Create/Create";
import { CreateCourseLesson } from "../pages/CreateCourseLesson/CreateCourseLesson";
import { EditCourse } from "../pages/EditCourse/EditCourse";
import { EditCourseLesson } from "../pages/EditCourseLesson/EditCourseLesson";
import { Favorites } from "../pages/Favorites/Favorites";
import { Lesson } from "../pages/Lesson/Lesson";
import { MyCourses } from "../pages/MyCourses/MyCourses";
import { NewCourses } from "../pages/NewCourses/NewCourses";
import { News } from "../pages/News/News";
import { Notification } from "../pages/Notification/Notification";
import { PopularCourses } from "../pages/PopularCourses/PopularCourses";
import { Profile } from "../pages/Profile/Profile";
import { Settings } from "../pages/Settings/Settings";

export const routes = (loading: boolean, auth: any) => {
  const routesNoAuth = [
    {
      path: "/",
      component: <News />,
    },
    {
      path: "/courses",
      component: <Courses />,
    },
    {
      path: "/new-courses",
      component: <NewCourses />,
    },
    {
      path: "/popular-courses",
      component: <PopularCourses />,
    },
    {
      path: "/course/:id",
      component: <Course />,
    },
    {
      path: "/404",
      component: <Error404 />,
    },
  ];

  const routesAuth = [
    {
      path: "/",
      component: <News />,
    },
    {
      path: "/courses",
      component: <Courses />,
    },
    {
      path: "/my-courses",
      component: <MyCourses />,
    },
    {
      path: "/favorites",
      component: <Favorites />,
    },
    {
      path: "/create",
      component: <Create />,
    },
    {
      path: "/settings",
      component: <Settings />,
    },
    {
      path: "/new-courses",
      component: <NewCourses />,
    },
    {
      path: "/popular-courses",
      component: <PopularCourses />,
    },
    {
      path: "/course/:id",
      component: <Course />,
    },
    {
      path: "/user/:id",
      component: <Profile />,
    },
    {
      path: "/edit/:id",
      component: <EditCourse />,
    },
    {
      path: "/edit/:id/lesson/:id",
      component: <EditCourseLesson />,
    },
    {
      path: "/create/:id/lesson",
      component: <CreateCourseLesson />,
    },
    {
      path: "/404",
      component: <Error404 />,
    },
    {
      path: "/lesson/:id",
      component: <Lesson />,
    },
    {
      path: "/notifications",
      component: <Notification />,
    },
  ];

  const adminRoutes = [
    {
      path: "/admin",
      component: <Admin />,
    },
    {
      path: "/admin/users",
      component: <AdminUsers />,
    },
    {
      path: "/admin/courses",
      component: <AdminCourses />,
    },
    {
      path: "/admin/untested-courses",
      component: <AdminUntestedCourses />,
    },
    {
      path: "/admin/proven-courses",
      component: <AdminProvenCourses />,
    },
    {
      path: "/admin/ban-users",
      component: <AdminBanUsers />,
    },
  ];

  const mapAuthRoutes = routesAuth.map((c) => {
    return (
      <Route key={c.path} path={c.path} exact>
        {c.component}
      </Route>
    );
  });

  const mapAdminRoutes = [...adminRoutes, ...routesAuth].map((c) => {
    return (
      <Route key={c.path} path={c.path} exact>
        {c.component}
      </Route>
    );
  });

  const mapNoAuthRoutes = routesNoAuth.map((c) => {
    return (
      <Route key={c.path} path={c.path} exact>
        {c.component}
      </Route>
    );
  });

  if (loading) {
    return <Loader />;
  }

  if (auth.role === "admin") {
    return (
      <>
        <Navigator auth={auth} />
        <Switch>
          {mapAdminRoutes}
          <Redirect to="/" />
        </Switch>
      </>
    );
  }

  if (auth._id) {
    return (
      <>
        <Navigator auth={auth} />
        <Switch>
          {mapAuthRoutes}
          <Redirect to="/" />
        </Switch>
      </>
    );
  }

  return (
    <>
      <Navigator auth={auth} />
      <Switch>
        {mapNoAuthRoutes}
        <Redirect to="/" />
      </Switch>
    </>
  );
};
