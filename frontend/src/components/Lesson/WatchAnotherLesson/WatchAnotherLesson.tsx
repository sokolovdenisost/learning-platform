import React from "react";
import { useSelector } from "react-redux";
import { ICourse } from "../../../interfaces/course";
import { IState } from "../../../interfaces/state";
import { IUser } from "../../../interfaces/user";
import { Button } from "../../Button/Button";
import { Modal } from "../../Modal/Modal";
import "./WatchAnotherLesson.scss";

interface Props {
  active: IModal;
  setActive: React.Dispatch<React.SetStateAction<IModal>>;
  course: ICourse;
  currentLesson: number;
  lesson_id: string;
}

export const WatchAnotherLesson = ({ active, setActive, course, currentLesson, lesson_id }: Props) => {
  const user: IUser = useSelector((state: IState) => state.user.user)

  const mapLessons = course.lessons.map((lesson, index) => {
    if (lesson_id === lesson) {
      return (
        <Button key={lesson} disable={true} type="bold" color="primary" fontSize="14">
          {index + 1}
        </Button>
      );
    } else if (course.owner._id === user._id) {
      return (
        <a key={lesson} href={`/lesson/${lesson}`} style={{ display: "block" }}>
          <Button type="bold" color="primary" fontSize="14" width="100%">
            {index + 1}
          </Button>
        </a>
      );
    } else {
      const check = course.lessons.findIndex((l) => course.lessons[currentLesson - 1] === l);
      if (index <= check) {
        return (
          <a key={lesson} href={`/lesson/${lesson}`} style={{ display: "block" }}>
            <Button type="bold" color="primary" fontSize="14" width="100%">
              {index + 1}
            </Button>
          </a>
        );
      }
      return (
        <Button key={lesson} disable={true} type="bold" color="primary" fontSize="14">
          {index + 1}
        </Button>
      );
    }
  });

  return (
    <Modal title="Another lessons" modal={active} setModal={setActive}>
      <div className="another-lessons">{mapLessons}</div>
    </Modal>
  );
};

interface IModal {
  type: string;
  active: boolean;
}
