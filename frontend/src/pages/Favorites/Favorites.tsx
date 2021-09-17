import React from 'react';
import { useSelector } from 'react-redux';
import { CardCourse } from '../../components/CardCourse/CardCourse';
import { Layout } from '../../components/Layout/Layout';
import { Loader } from '../../components/Loader/Loader';
import { ICourse } from '../../interfaces/course';
import './Favorites.scss';

export const Favorites = () => {
  const user = useSelector((state: any) => state.user);

  const mapCourses = user.user.favorites.map((course: ICourse) => {
    return <CardCourse key={course._id} course={course} />;
  });

  if (user.loading) {
    return <Loader />;
  }

  return (
    <Layout title="Favorite courses">
      <div className="favorite-page">{user.user.favorites.length ? mapCourses : 'No favorites courses'}</div>
    </Layout>
  );
};
