import React from 'react';
import { Button } from '../Button/Button';
import { CardCourse } from '../CardCourse/CardCourse';
import './Progress.scss';

export const Progress = () => {
  return (
    <div className="progress">
      <CardCourse />
      <div className="progress-body">
        <div className="progress-title">Course passed on</div>
        <div className="progress-block">
          <div className="progress-percent">75%</div>
          <div className="line" />
          <div className="progress-info">
            <div className="progress-text">3 out of 14 - Lessons</div>
            <div className="progress-text">50 out of 100 - Stars received</div>
            <div className="progress-text">10 out of 14 - Tasks completed</div>
          </div>
          <div className="progress-button">
            <Button fontSize="14" type="bold" color="main">
              CONTINUE
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
