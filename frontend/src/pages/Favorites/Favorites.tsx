import React from 'react';
import { CardCourse } from '../../components/CardCourse/CardCourse';
import { Layout } from '../../components/Layout/Layout';
import { ICourse } from '../../interfaces/course';
import './Favorites.scss';

interface Props {
  courses: ICourse[];
}

export const Favorites = ({ courses }: Props) => {
  const mapCourses = courses.map((course) => {
    return <CardCourse key={course._id} course={course} />;
  });
  return (
    <Layout title="Favorite courses">
      <div className="favorite-page">{mapCourses}</div>
    </Layout>
  );
};
