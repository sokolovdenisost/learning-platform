import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Navigator } from '../components/Navigator/Navigator';
import { Course } from '../pages/Course/Course';
import { Courses } from '../pages/Courses/Courses';
import { Create } from '../pages/Create/Create';
import { Favorites } from '../pages/Favorites/Favorites';
import { MyCourses } from '../pages/MyCourses/MyCourses';
import { NewCourses } from '../pages/NewCourses/NewCourses';
import { News } from '../pages/News/News';
import { PopularCourses } from '../pages/PopularCourses/PopularCourses';
import { Profile } from '../pages/Profile/Profile';
import { Settings } from '../pages/Settings/Settings';

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
    component: <Settings />,
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
];

export const routes = (auth: boolean) => {
  const mapAuthRoutes = routesAuth.map((c) => {
    return (
      <Route key={c.path} path={c.path} exact>
        {c.component}
      </Route>
    );
  });
  if (auth) {
    return (
      <>
        <Navigator />
        <Switch>
          {mapAuthRoutes}
          <Redirect to="/" />
        </Switch>
      </>
    );
  }
  return (
    <>
      <Navigator />
      <Switch>
        {mapAuthRoutes}
        <Redirect to="/" />
      </Switch>
    </>
  );
};
