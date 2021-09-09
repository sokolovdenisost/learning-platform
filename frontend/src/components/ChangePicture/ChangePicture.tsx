import React, { useRef } from 'react';
import { Button } from '../Button/Button';
import './ChangePicture.scss';

interface Props {
  title: string;
  img?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ChangePicture = ({ title, img, onChange }: Props) => {
  const input = useRef<HTMLInputElement | null>(null);

  function onClickInput() {
    input.current?.click();
  }

  return (
    <div className="change-picture">
      <div className="change-picture-title">{title}</div>
      <div className="change-picture-body">
        <img alt="" className="left" src={img} />
        <div className="right">
          <div className="top">
            <Button fontSize="14" type="outline" color="primary" onClick={onClickInput}>
              Upload new photo
            </Button>
            <input type="file" name="photo" id="photo" hidden ref={input} onChange={(e) => onChange(e)} />

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
