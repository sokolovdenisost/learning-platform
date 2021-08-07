import React from 'react';
import { CardCourse } from '../../components/CardCourse/CardCourse';
import { Filter } from '../../components/Filter/Filter';
import { Layout } from '../../components/Layout/Layout';
import './Courses.scss';

export const Courses = () => {
  return (
    <Layout title="All courses">
      <div className="courses-page">
        <Filter />
        <CardCourse />
        <CardCourse />
        <CardCourse />
        <CardCourse />
      </div>
    </Layout>
  );
};
