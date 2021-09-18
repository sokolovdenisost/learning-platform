import React from 'react';
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
  };
}

export const Comment = ({ info }: Props) => {
  return (
    <div className="comment-block">
      <div className="comment-left">
        <img src={info.user.avatar.photo_url} alt="" className="comment-user-image" />
      </div>
      <div className="comment-right">
        <div className="comment-top">{info.user.firstName + ' ' + info.user.lastName}</div>
        <div className="comment-body">{info.comment}</div>
      </div>
    </div>
  );
};
