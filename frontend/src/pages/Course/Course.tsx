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

export const Course = () => {
  const [course, setCourse] = useState<ICourse>({
    _id: '',
    tags: [],
    level: '',
    certificate: '',
    description: '',
    title: '',
    image: {
      photo_url: '',
      public_id: '',
    },
    owner: {
      _id: '',
      firstName: '',
      lastName: '',
    },
    lessons: [],
  });
  const [error, setError] = useState();
  const params = window.location.pathname.split('/');

  useEffect(() => {
    fetch(`${API_URL}/course/${params[2]}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.type === 'Error') {
          setError(res);
        } else {
          setCourse(res.course);
        }
      });
  }, []);

  const mapTags = course.tags.map((tag) => {
    return <Tag title={tag} key={tag} />;
  });

  if (error) {
    return <Redirect to="/404" />;
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
