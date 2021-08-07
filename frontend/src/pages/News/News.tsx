import React from 'react';
import { Layout } from '../../components/Layout/Layout';
import { Slider } from '../../components/Slider/Slider';
import './News.scss';

export const News = () => {
  return (
    <Layout title="News">
      <Slider title="New courses" />
      <Slider title="Most popular courses" />
    </Layout>
  );
};
