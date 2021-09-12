import React from 'react';
import './Comment.scss';

export const Comment = () => {
  return (
    <div className="comment-block">
      <div className="comment-left">
        <img
          src="https://images.unsplash.com/photo-1628191011993-69070758764f?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
          alt=""
          className="comment-user-image"
        />
      </div>
      <div className="comment-right">
        <div className="comment-top">Denis Sokolov</div>
        <div className="comment-body">
          Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице
          с начала XVI века. Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для
          текстов на латинице с начала XVI века.{' '}
        </div>
      </div>
    </div>
  );
};
