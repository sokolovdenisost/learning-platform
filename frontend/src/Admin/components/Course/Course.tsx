import React from "react";
import { Button } from "../../../components/Button/Button";
import { Tag } from "../../../components/Tag/Tag";
import { ICourse } from "../../../interfaces/course";
import { setVerifiedHandler } from "../../../utils/admin";
import { deleteCourseHandler } from "../../../utils/course";
import { Block } from "../Block/Block";
import "./Course.scss";

interface Props {
  course: ICourse;
}

export const Course = ({ course }: Props) => {
  return (
    <Block>
      <div className="course-block">
        <div className="course-block-left">
          <img src={course.image.photo_url} alt="" className="course-block-image" />
        </div>
        <div className="course-block-right">
          <div className="course-block-info">
            <div className="course-block-title">{course.title}</div>
            <div className="course-block-description">{course.description}</div>
            <div className="course-block-tags">
              {course.tags.map((tag) => (
                <Tag key={tag} title={tag} />
              ))}
            </div>
          </div>
          <div className="course-block-buttons">
            <Button
              width="120px"
              disable={course.isVerification}
              type="bold"
              color="success"
              fontSize="14"
              onClick={() => setVerifiedHandler(course._id)}
            >
              Set verified
            </Button>
            <a href={`/lesson/${course.lessons[0]}`}>
              <Button width="120px" type="bold" color="primary" fontSize="14">
                Check
              </Button>
            </a>
            <Button width="120px" type="bold" color="danger" fontSize="14" onClick={() => deleteCourseHandler(course._id)}>
              Delete
            </Button>
          </div>
        </div>
      </div>
    </Block>
  );
};
