import React from 'react';
import { CardCourseCreated } from '../../components/CardCourseCreated/CardCourseCreated';
import { Layout } from '../../components/Layout/Layout';
import { Progress } from '../../components/Progress/Progress';
import './MyCourses.scss';

export const MyCourses = () => {
  return (
    <Layout title="My courses">
      <div className="my-courses-page">
        <div className="my-courses-learning">
          <div className="my-courses-title">My learning courses</div>
          <Progress />
        </div>
        <div className="my-courses-created">
          <div className="my-courses-title">My created courses</div>
          <CardCourseCreated />
        </div>
      </div>
    </Layout>
  );
};
