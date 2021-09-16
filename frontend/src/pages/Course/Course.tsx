import React, { useEffect } from 'react';
import { Block } from '../../components/Block/Block';
import { Button } from '../../components/Button/Button';
import { Layout } from '../../components/Layout/Layout';
import { AiFillStar } from 'react-icons/ai';
import './Course.scss';
import { Tag } from '../../components/Tag/Tag';
import { useDispatch, useSelector } from 'react-redux';
import { getCourse } from '../../store/actions/courseAction';
import { Loader } from '../../components/Loader/Loader';
import { Error404 } from '../404/404';
import { joinCourseHandler, setRatingForCourseHandler } from '../../utils/course';
import { useRating } from '../../hooks/rating';
import { LessonBlock } from '../../components/LessonBlock/LessonBlock';

export const Course = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const course = useSelector((state: any) => state.course.course);
  const loading = useSelector((state: any) => state.course.loading);
  const error = useSelector((state: any) => state.course.error);
  const params = window.location.pathname.split('/');
  const rating = useRating(course.rating);

  useEffect(() => {
    dispatch(getCourse(params[2]));
  }, []);

  function checkJoinedTheCourse(): boolean {
    const check = user.takeCourses.filter((c: any) => c.course === course._id);
    return check.length ? true : false;
  }

  const mapTags = course.tags.map((tag: string) => {
    return <Tag title={tag} key={tag} />;
  });

  const mapLessons = course.lessons.map((lesson: any, index: number) => {
    return <LessonBlock key={lesson._id} course={course} _id={lesson._id} title={`Lesson #${index + 1}`} type="" />;
  });

  if (error) {
    return <Error404 />;
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
                <div className="course-rating-number">{rating.rating}</div>
                <div className="course-rating-stars">
                  <button className="button" onClick={() => setRatingForCourseHandler(course._id, 1)}>
                    <AiFillStar size={24} color="#fadf6b" />
                  </button>
                  <button className="button" onClick={() => setRatingForCourseHandler(course._id, 2)}>
                    <AiFillStar size={24} color="#fadf6b" />
                  </button>
                  <button className="button" onClick={() => setRatingForCourseHandler(course._id, 3)}>
                    <AiFillStar size={24} color="#fadf6b" />
                  </button>
                  <button className="button" onClick={() => setRatingForCourseHandler(course._id, 4)}>
                    <AiFillStar size={24} color="#fadf6b" />
                  </button>
                  <button className="button" onClick={() => setRatingForCourseHandler(course._id, 5)}>
                    <AiFillStar size={24} color="#fadf6b" />
                  </button>
                </div>
                <div className="course-rating-votes">{rating.ratings}</div>
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
        {user._id ? (
          <div className="course-buttons">
            <Button disable={checkJoinedTheCourse()} type="bold" color="primary" fontSize="16" onClick={() => joinCourseHandler(course._id)}>
              Join course
            </Button>
            <Button type="bold" color="danger" fontSize="16">
              Report course
            </Button>
          </div>
        ) : null}
        <div className="course-lessons">
          <div className="course-lessons-title">Lessons</div>
          <div className="course-lessons-all">{course.lessons.length ? mapLessons : 'Not lessons'}</div>
        </div>
      </div>
    </Layout>
  );
};
