import React from 'react';
import { useProcent } from '../../hooks/procent';
import { ICourse } from '../../interfaces/course';
import { Button } from '../Button/Button';
import { CardCourse } from '../CardCourse/CardCourse';
import './Progress.scss';

interface Props {
  takeCourse: {
    course: ICourse;
    currentLesson: number;
    _id: string;
  };
}

export const Progress = ({ takeCourse }: Props) => {
  function continueLearningCourse() {
    const lessonId = takeCourse.course.lessons[takeCourse.currentLesson - 1];

    if (lessonId) {
      return window.location.pathname = `/lesson/${lessonId}`;
    }

    return window.location.pathname = `/lesson/${takeCourse.course.lessons[0]}`
  }

  return (
    <div className="progress">
      <CardCourse course={takeCourse.course} />
      <div className="progress-body">
        <div className="progress-title">Course passed on</div>
        <div className="progress-block">
          <div className="progress-percent">{useProcent(takeCourse.currentLesson, takeCourse.course.lessons.length)}</div>
          <div className="line" />
          <div className="progress-info">
            <div className="progress-text">
              {takeCourse.currentLesson - 1} out of {takeCourse.course.lessons.length} - Lessons
            </div>
            <div className="progress-text">50 out of 100 - Stars received</div>
            <div className="progress-text">10 out of 14 - Tasks completed</div>
          </div>
          <div className="progress-button">
            <Button fontSize="14" type="bold" color="main" onClick={continueLearningCourse}>
              CONTINUE
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
