import React from 'react';
import { Layout } from '../../components/Layout/Layout';
import { Slider } from '../../components/Slider/Slider';
import './News.scss';

export const News = () => {
  return (
    <Layout title="News">
      <Slider title="New courses" link="/new-courses" />
      <Slider title="Most popular courses" link="/popular-courses" />
    </Layout>
  );
};
