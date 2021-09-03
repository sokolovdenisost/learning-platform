import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Loader } from '../components/Loader/Loader';
import { Navigator } from '../components/Navigator/Navigator';
import { Course } from '../pages/Course/Course';
import { Courses } from '../pages/Courses/Courses';
import { Create } from '../pages/Create/Create';
import { CreateCourseLesson } from '../pages/CreateCourseLesson/CreateCourseLesson';
import { EditCourse } from '../pages/EditCourse/EditCourse';
import { EditCourseLesson } from '../pages/EditCourseLesson/EditCourseLesson';
import { Favorites } from '../pages/Favorites/Favorites';
import { MyCourses } from '../pages/MyCourses/MyCourses';
import { NewCourses } from '../pages/NewCourses/NewCourses';
import { News } from '../pages/News/News';
import { PopularCourses } from '../pages/PopularCourses/PopularCourses';
import { Profile } from '../pages/Profile/Profile';
import { Settings } from '../pages/Settings/Settings';
import { useAuth } from './auth';

export const routes = (loading: boolean, auth: any) => {
  const routesAuth = [
    {
      path: '/',
      component: <News />,
    },
    {
      path: '/courses',
      component: <Courses />,
    },
    {
      path: '/my-courses',
      component: <MyCourses />,
    },
    {
      path: '/favorites',
      component: <Favorites />,
    },
    {
      path: '/create',
      component: <Create />,
    },
    {
      path: '/settings',
      component: <Settings user={auth} />,
    },
    {
      path: '/new-courses',
      component: <NewCourses />,
    },
    {
      path: '/popular-courses',
      component: <PopularCourses />,
    },
    {
      path: '/course/:id',
      component: <Course />,
    },
    {
      path: '/profile',
      component: <Profile />,
    },
    {
      path: '/edit/:id',
      component: <EditCourse />,
    },
    {
      path: '/edit/:id/lesson/:id',
      component: <EditCourseLesson />,
    },
    {
      path: '/create/:id/lesson',
      component: <CreateCourseLesson />,
    },
  ];

  const mapAuthRoutes = routesAuth.map((c) => {
    return (
      <Route key={c.path} path={c.path} exact>
        {c.component}
      </Route>
    );
  });

  if (loading) {
    return <Loader />;
  }

  if (auth) {
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
        {mapAuthRoutes}
        <Redirect to="/" />
      </Switch>
    </>
  );
};
