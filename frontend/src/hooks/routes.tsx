import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Navigator } from '../components/Navigator/Navigator';
import { Courses } from '../pages/Courses/Courses';
import { Create } from '../pages/Create/Create';
import { Favorites } from '../pages/Favorites/Favorites';
import { MyCourses } from '../pages/MyCourses/MyCourses';
import { News } from '../pages/News/News';
import { Settings } from '../pages/Settings/Settings';

export const routes = (auth: boolean) => {
  if (auth) {
    return (
      <>
        <Navigator />
        <Switch>
          <Route path="/" exact>
            <News />
          </Route>
          <Route path="/courses" exact>
            <Courses />
          </Route>
          <Route path="/my-courses" exact>
            <MyCourses />
          </Route>
          <Route path="/favorites" exact>
            <Favorites />
          </Route>
          <Route path="/create" exact>
            <Create />
          </Route>
          <Route path="/settings" exact>
            <Settings />
          </Route>
          <Redirect to="/" />
        </Switch>
      </>
    );
  }
  return (
    <>
      <Navigator />
      <Switch>
        <Route exact path="/">
          <News />
        </Route>
        <Route exact path="/courses">
          <Courses />
        </Route>
        <Route exact path="/my-courses">
          <MyCourses />
        </Route>
        <Route exact path="/favorites">
          <Favorites />
        </Route>
        <Route exact path="/create">
          <Create />
        </Route>
        <Route exact path="/settings">
          <Settings />
        </Route>
        <Redirect to="/" />
      </Switch>
    </>
  );
};
