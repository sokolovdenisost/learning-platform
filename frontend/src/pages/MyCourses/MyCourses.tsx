import React, { useState, useEffect } from 'react';
import { CardCourseCreated } from '../../components/CardCourseCreated/CardCourseCreated';
import { Layout } from '../../components/Layout/Layout';
import { Progress } from '../../components/Progress/Progress';
import { API_URL } from '../../consts';
import './MyCourses.scss';

export const MyCourses = () => {
  const [myCreatedCourses, setMyCreatedCourses] = useState<ICourse[]>([]);
  const user_id = localStorage.getItem('user_id');
  useEffect(() => {
    fetch(`${API_URL}/courses/${user_id}`)
      .then((res) => res.json())
      .then((res) => {
        setMyCreatedCourses(res.courses);
      });
  }, []);

  const mapCreatedCourses = myCreatedCourses.map((course) => {
    return <CardCourseCreated course={course} key={course._id} />;
  });

  return (
    <Layout title="My courses">
      <div className="my-courses-page">
        <div className="my-courses-learning">
          <div className="my-courses-title">My learning courses</div>
          <Progress />
        </div>
        <div className="my-courses-created">
          <div className="my-courses-title">My created courses</div>
          {myCreatedCourses.length ? mapCreatedCourses : 'Not created courses'}
        </div>
      </div>
    </Layout>
  );
};

interface ICourse {
  _id: string;
  tags: string[];
  level: string;
  certificate: boolean;
  description: string;
  title: string;
  image: string;
  owner: {
    _id: string;
    firstName: string;
    lastName: string;
  };
}
