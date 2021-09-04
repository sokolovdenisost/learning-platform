import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout/Layout';
import { API_URL } from '../../consts';
import './EditCourse.scss';

export const EditCourse = () => {
  const [course, setCourse] = useState({});

  useEffect(() => {
    const id = window.location.pathname.split('/')[2];
    fetch(`${API_URL}/course/${id}`)
      .then((res) => res.json())
      .then((res) => console.log(res));
  }, []);

  return (
    <Layout title="Edit course">
      <div>EditCourse</div>
    </Layout>
  );
};
