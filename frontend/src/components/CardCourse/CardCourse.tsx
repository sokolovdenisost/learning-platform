import React from 'react';
import { Tag } from '../Tag/Tag';
import { HiOutlineBookmark, HiBookmark } from 'react-icons/hi';
import { FiMoreVertical } from 'react-icons/fi';
import { AiFillStar } from 'react-icons/ai';
import './CardCourse.scss';
import { ICourse } from '../../interfaces/course';
import { favoriteCourseHandler } from '../../utils/course';
import { useFavorite } from '../../hooks/favorite';

interface Props {
  title?: string;
  translateY?: number;
  styles?: Styles;
  course: ICourse;
}

export const CardCourse = ({ title, translateY, styles, course }: Props) => {
  const styleCard = styles
    ? {
        transform: `translateY(-${translateY}px) scale(${styles.scale})`,
        opacity: styles.opacity,
        visibility: styles.visibility,
      }
    : {
        marginBottom: 15,
      };

  const mapTags = course.tags.map((tag) => {
    return <Tag title={tag} key={tag} />;
  });

  async function toggleFavoriteCourse(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    await favoriteCourseHandler(course._id);
  }

  function moreCourse(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
  }

  const favorite = useFavorite(course._id);

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
              <button className="button">
                <AiFillStar size={24} color="#fadf6b" />
              </button>
              <button className="button">
                <AiFillStar size={24} color="#fadf6b" />
              </button>
              <button className="button">
                <AiFillStar size={24} color="#fadf6b" />
              </button>
              <button className="button">
                <AiFillStar size={24} color="#fadf6b" />
              </button>
              <button className="button">
                <AiFillStar size={24} color="#b3b3c1" />
              </button>
            </div>
            <div className="avg">4,0</div>
          </div>
          <div className="how-many-rating">(36.420 raitings)</div>
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
