import React from 'react';
import { Layout } from '../../components/Layout/Layout';
import { Progress } from '../../components/Progress/Progress';
import './MyCourses.scss';

export const MyCourses = () => {
  return (
    <Layout title="My courses">
      <div className="my-courses-page">
        <Progress />
      </div>
    </Layout>
  );
};
