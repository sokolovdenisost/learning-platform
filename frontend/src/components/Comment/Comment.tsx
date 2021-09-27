import React from 'react';
import { useData } from '../../hooks/data';
import './Comment.scss';

interface Props {
  info: {
    user: {
      firstName: string;
      lastName: string;
      _id: string;
      avatar: {
        public_id: string;
        photo_url: string;
      };
    };
    comment: string;
    date: string;
  };
}

export const Comment = ({ info }: Props) => {
  return (
    <div className="comment-block">
      <div className="comment-left">
        <img src={info.user.avatar.photo_url} alt="" className="comment-user-image" />
      </div>
      <div className="comment-right">
        <div className="comment-top">
          <div className="comment-fullname">
            <a href={`/user/${info.user._id}`}>{info.user.firstName + ' ' + info.user.lastName}</a>
          </div>
          <div className="comment-date">{useData(info.date)}</div>
        </div>
        <div className="comment-body">{info.comment}</div>
      </div>
    </div>
  );
};
