import React from 'react';
import { Tag } from '../Tag/Tag';
import { HiOutlineBookmark } from 'react-icons/hi';
import { FiMoreVertical } from 'react-icons/fi';
import { AiFillStar } from 'react-icons/ai';
import './CardCourse.scss';

interface Props {
  title?: string;
  translateY?: number;
  styles?: Styles;
}

export const CardCourse = ({ title, translateY, styles }: Props) => {
  const styleCard = styles
    ? {
        transform: `translateY(-${translateY}px) scale(${styles.scale})`,
        opacity: styles.opacity,
        visibility: styles.visibility,
      }
    : {
        marginBottom: 15,
      };

  return (
    <a href="/course/1" className="card-course" style={styleCard}>
      <img
        src="https://images.unsplash.com/photo-1628191081698-44f573462a03?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        alt="course"
        className="image"
      />
      <div className="info">
        <div className="title">Strategy, Design, Development</div>
        <div className="description">Learn how to apply User Experience (UX) principles to your website designs, code ...</div>
        <div className="owner-course">
          Created by <span>John Davis</span>
        </div>
        <div className="tags">
          <Tag title="UX Design" />
          <Tag title="UI Design" />
          <Tag title="Web design" />
        </div>
      </div>
      <div className="interaction">
        <div className="top">
          <button className="button">
            <HiOutlineBookmark size={24} />
          </button>
          <button className="button">
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
