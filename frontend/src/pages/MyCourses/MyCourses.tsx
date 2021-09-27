import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardCourseCreated } from "../../components/CardCourseCreated/CardCourseCreated";
import { Layout } from "../../components/Layout/Layout";
import { Loader } from "../../components/Loader/Loader";
import { Progress } from "../../components/Progress/Progress";
import { ICourse } from "../../interfaces/course";
import { IState, IStateCourses } from "../../interfaces/state";
import { getCreatedCourses, getTakeCourses } from "../../store/actions/coursesAction";
import "./MyCourses.scss";

export const MyCourses = () => {
  const dispatch = useDispatch();
  const user_id = localStorage.getItem("user_id");
  const { createdCourses, takeCourses, loading }: IStateCourses = useSelector((state: IState) => state.courses);

  useEffect(() => {
    dispatch(getCreatedCourses(String(user_id)));
    dispatch(getTakeCourses(String(user_id)));
  }, []);

  const mapCreatedCourses = createdCourses.map((course: ICourse) => {
    return <CardCourseCreated course={course} key={course._id} />;
  });

  const mapTakeCourses = takeCourses.map((takeCourse: TakeCourse) => {
    return <Progress key={takeCourse._id} takeCourse={takeCourse} />;
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <Layout title="My courses">
      <div className="my-courses-page">
        <div className="my-courses-learning">
          <div className="my-courses-title">My learning courses</div>
          {takeCourses.length ? mapTakeCourses : "Not take courses"}
        </div>
        <div className="my-courses-created">
          <div className="my-courses-title">My created courses</div>
          {createdCourses.length ? <div className="my-created-courses">{mapCreatedCourses}</div> : "Not created courses"}
        </div>
      </div>
    </Layout>
  );
};

interface TakeCourse {
  course: ICourse;
  currentLesson: number;
  _id: string;
}
