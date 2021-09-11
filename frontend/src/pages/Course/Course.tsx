import React, { useState, useEffect } from 'react';
import { Block } from '../../components/Block/Block';
import { Button } from '../../components/Button/Button';
import { Layout } from '../../components/Layout/Layout';
import { AiFillStar } from 'react-icons/ai';
import './Course.scss';
import { API_URL } from '../../consts';
import { Redirect } from 'react-router';
import { Tag } from '../../components/Tag/Tag';
import { ICourse } from '../../interfaces/course';
import { useDispatch, useSelector } from 'react-redux';
import { getCourse } from '../../store/actions/courseAction';
import { Loader } from '../../components/Loader/Loader';

export const Course = () => {
  const dispatch = useDispatch();
  const course = useSelector((state: any) => state.course.course);
  const loading = useSelector((state: any) => state.course.loading);
  const error = useSelector((state: any) => state.course.error);
  const params = window.location.pathname.split('/');
  console.log(error);

  useEffect(() => {
    dispatch(getCourse(params[2]));
  }, []);

  const mapTags = course.tags.map((tag: string) => {
    return <Tag title={tag} key={tag} />;
  });

  if (error) {
    return <Redirect to="/404" />;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <Layout title="Course">
      <div className="course-page">
        <Block width="100%">
          <div className="course-info">
            <div className="course-left">
              <img className="course-image" alt="" src={course.image.photo_url} />
              <div className="course-rating">
                <div className="course-rating-number">5,0</div>
                <div className="course-rating-stars">
                  <AiFillStar size={24} color="#fadf6b" />
                  <AiFillStar size={24} color="#fadf6b" />
                  <AiFillStar size={24} color="#fadf6b" />
                  <AiFillStar size={24} color="#fadf6b" />
                  <AiFillStar size={24} color="#fadf6b" />
                </div>
                <div className="course-rating-votes">40.000 ratings</div>
              </div>
            </div>
            <div className="course-right">
              <div className="course-title">{course.title}</div>
              <div className="course-description">{course.description}</div>
              <div className="course-created-by">
                Created by <span>{course.owner.firstName + ' ' + course.owner.lastName}</span>
              </div>
              <div className="course-level">
                This level for course - <span>{course.level}</span>
              </div>
              <div className="course-certificate">
                Certificate - <span>{course.certificate}</span>
              </div>
              <div className="course-bottom">
                <div className="course-tags">{mapTags}</div>
              </div>
            </div>
          </div>
        </Block>
        <div className="course-buttons">
          <Button type="bold" color="primary" fontSize="16">
            Join course
          </Button>
          <Button type="bold" color="danger" fontSize="16">
            Report course
          </Button>
        </div>
        <div className="course-lessons">
          <div className="course-lessons-title">Lessons</div>
        </div>
      </div>
    </Layout>
  );
};
