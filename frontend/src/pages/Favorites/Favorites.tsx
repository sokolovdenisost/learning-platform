import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardCourse } from '../../components/CardCourse/CardCourse';
import { Layout } from '../../components/Layout/Layout';
import { Loader } from '../../components/Loader/Loader';
import { ICourse } from '../../interfaces/course';
import { IState, IStateUser } from '../../interfaces/state';
import { IUser } from '../../interfaces/user';
import { getFavoriteCourses } from '../../store/actions/coursesAction';
import './Favorites.scss';

export const Favorites = () => {
  const { favoriteCourses, loading } = useSelector((state: IState) => state.courses)
  const user: IUser = useSelector((state: IState) => state.user.user)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getFavoriteCourses(user._id))
  }, [])

  const mapCourses = favoriteCourses.map((course: ICourse) => <CardCourse key={course._id} course={course} />);

  if (loading) {
    return <Loader />;
  }

  return (
    <Layout title="Favorite courses">
      <div className="favorite-page">{favoriteCourses.length ? mapCourses : 'No favorites courses'}</div>
    </Layout>
  );
};
