import React from 'react';
import { Button } from '../Button/Button';
import './ChangePicture.scss';

interface Props {
  title: string;
}

export const ChangePicture = ({ title }: Props) => {
  return (
    <div className="change-picture">
      <div className="change-picture-title">{title}</div>
      <div className="change-picture-body">
        <img
          alt=""
          className="left"
          src="https://images.unsplash.com/photo-1628344806892-11873eba7974?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0Nnx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        />
        <div className="right">
          <div className="top">
            <Button fontSize="14" type="bold" color="primary">
              Upload new photo
            </Button>
            <Button fontSize="14" type="outline" color="danger">
              Remove
            </Button>
          </div>
          <div className="bottom">Image formats with max size of 3mb</div>
        </div>
      </div>
    </div>
  );
};
