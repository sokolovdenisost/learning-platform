import React from "react";
import { ICourse } from "../../interfaces/course";
import { Button } from "../Button/Button";
import { CardCourse } from "../CardCourse/CardCourse";
import "./CardCourseCompleted.scss";

interface Props {
  course: ICourse;
}

export const CardCourseCompleted = ({ course }: Props) => {
  return (
    <div className="card-course-completed">
      <CardCourse course={course} />
      <div className="card-course-completed-buttons">
        <Button type="bold" fontSize="14" color="primary">
          CONTINUE
        </Button>
      </div>
    </div>
  );
};
