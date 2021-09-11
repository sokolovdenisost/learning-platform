import React from 'react';
import { Layout } from '../../components/Layout/Layout';
import './Lesson.scss';

export const Lesson = () => {
  return (
    <Layout>
      <div className="lesson-page">
        <div className="lesson-course-progress">
          <div className="course-progress-top">
            <div className="course-progress-title">JavaScript Basic</div>
            <div className="course-progress-procent">90%</div>
          </div>
          <div className="course-progress-lines">
            <div className="course-progress-line-fullprocent" />
            <div className="course-progress-line-procent" />
          </div>
        </div>
      </div>
    </Layout>
  );
};
