import React, { useState } from "react";
import { ICourse } from "../../interfaces/course";
import { deleteCourseHandler } from "../../utils/course";
import { Button } from "../Button/Button";
import { CardCourse } from "../CardCourse/CardCourse";
import { ConfirmModal } from "../Modal/Modal";
import "./CardCourseCreated.scss";

interface Props {
  course: ICourse;
}

export const CardCourseCreated = ({ course }: Props) => {
  const [modal, setModal] = useState({
    type: "",
    active: false,
  });

  return (
    <>
      <div className="card-course-created">
        <CardCourse course={course} />
        <div className="course-buttons">
          <a className="course-button-edit" href={`/edit/${course._id}`}>
            <Button type="bold" color="primary" fontSize="14" width="100%">
              Edit course
            </Button>
          </a>
          <Button type="bold" color="danger" fontSize="14" onClick={() => setModal({ ...modal, active: true })}>
            Delete course
          </Button>
        </div>
      </div>
      {modal.active ? <ConfirmModal modal={modal} setModal={setModal} onClick={() => deleteCourseHandler(course._id)} /> : null}
    </>
  );
};
