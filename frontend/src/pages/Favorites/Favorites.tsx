import React from 'react';
import { useSelector } from 'react-redux';
import { CardCourse } from '../../components/CardCourse/CardCourse';
import { Layout } from '../../components/Layout/Layout';
import { Loader } from '../../components/Loader/Loader';
import { ICourse } from '../../interfaces/course';
import { IState, IStateUser } from '../../interfaces/state';
import './Favorites.scss';

export const Favorites = () => {
  const { user, loading }: IStateUser = useSelector((state: IState) => state.user);

  const mapCourses = user.favorites.map((course: ICourse) => {
    return <CardCourse key={course._id} course={course} />;
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <Layout title="Favorite courses">
      <div className="favorite-page">{user.favorites.length ? mapCourses : 'No favorites courses'}</div>
    </Layout>
  );
};
