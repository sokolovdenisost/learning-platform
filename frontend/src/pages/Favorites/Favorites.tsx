import React from 'react';
import { CardCourse } from '../../components/CardCourse/CardCourse';
import { Layout } from '../../components/Layout/Layout';
import './Favorites.scss';

export const Favorites = () => {
  return (
    <Layout title="Favorite courses">
      <div className="favorite-page">
        <CardCourse />
        <CardCourse />
      </div>
    </Layout>
  );
};
