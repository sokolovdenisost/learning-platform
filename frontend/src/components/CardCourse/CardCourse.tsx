import React, { useCallback } from 'react';
import { Tag } from '../Tag/Tag';
import { HiOutlineBookmark, HiBookmark } from 'react-icons/hi';
import { FiMoreVertical } from 'react-icons/fi';
import { AiFillStar } from 'react-icons/ai';
import './CardCourse.scss';
import { ICourse } from '../../interfaces/course';
import { favoriteCourseHandler, setRatingForCourseHandler } from '../../utils/course';
import { useFavorite } from '../../hooks/favorite';
import { useRating } from '../../hooks/rating';
import { IUser } from '../../interfaces/user';
import { useSelector } from 'react-redux';
import { IState } from '../../interfaces/state';

interface Props {
  translateY?: number;
  styles?: Styles;
  course: ICourse;
}

export const CardCourse = ({ translateY, styles, course }: Props) => {
  const user: IUser = useSelector((state: IState) => state.user.user)
  const styleCard = styles
    ? {
        transform: `translateY(-${translateY}px) scale(${styles.scale})`,
        opacity: styles.opacity,
        visibility: styles.visibility,
      }
    : {
        marginBottom: 15,
      };

  const favorite = useFavorite(user._id, course);
  const rating = useRating(course.rating);

  const mapTags = course.tags.map((tag) => {
    return <Tag title={tag} key={tag} />;
  });

  function toggleFavoriteCourse(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    favoriteCourseHandler(course._id);
  }

  function moreCourse(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
  }

  function setRatingForCourse(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, rating: number) {
    e.preventDefault();
    setRatingForCourseHandler(course._id, rating);
  }

  return (
    <a href={`/course/${course._id}`} className="card-course" style={styleCard}>
      <img src={course.image.photo_url} alt="course" className="image" />
      <div className="info">
        <div className="title">{course.title}</div>
        <div className="description">{course.description}</div>
        <div className="owner-course">
          Created by <span>{course.owner.firstName + ' ' + course.owner.lastName}</span>
        </div>
        <div className="tags">{mapTags}</div>
      </div>
      <div className="interaction">
        <div className="top">
          <button className="button" onClick={(e) => toggleFavoriteCourse(e)}>
            {favorite ? <HiBookmark size={25} color="#EE0000" /> : <HiOutlineBookmark size={24} />}
          </button>
          <button className="button" onClick={(e) => moreCourse(e)}>
            <FiMoreVertical size={24} />
          </button>
        </div>
        <div className="bottom">
          <div className="rating">
            <div className="stars">
              <button className="button" onClick={(e) => setRatingForCourse(e, 1)}>
                <AiFillStar size={24} color="#fadf6b" />
              </button>
              <button className="button" onClick={(e) => setRatingForCourse(e, 2)}>
                <AiFillStar size={24} color="#fadf6b" />
              </button>
              <button className="button" onClick={(e) => setRatingForCourse(e, 3)}>
                <AiFillStar size={24} color="#fadf6b" />
              </button>
              <button className="button" onClick={(e) => setRatingForCourse(e, 4)}>
                <AiFillStar size={24} color="#fadf6b" />
              </button>
              <button className="button" onClick={(e) => setRatingForCourse(e, 5)}>
                <AiFillStar size={24} color="#b3b3c1" />
              </button>
            </div>
            <div className="avg">{rating.rating}</div>
          </div>
          <div className="how-many-rating">({rating.ratings} ratings)</div>
        </div>
      </div>
    </a>
  );
};

interface Styles {
  scale: number;
  opacity: number;
  visibility: VisibilityState;
}
