import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardCourse } from "../../components/CardCourse/CardCourse";
import { Filter } from "../../components/Filter/Filter";
import { Layout } from "../../components/Layout/Layout";
import { Loader } from "../../components/Loader/Loader";
import { API_URL } from "../../consts";
import { ICourse } from "../../interfaces/course";
import { IState, IStateCourses } from "../../interfaces/state";
import { useTranslation } from "react-i18next";
import { getAllCourses } from "../../store/actions/coursesAction";
import "./Courses.scss";
import { useFilter } from "../../hooks/filter";

export const Courses = () => {
  const { t } = useTranslation();
  const [tags, setTags] = useState<Tags>({
    Categories: [],
    Language: [],
    Level: [],
  });
  const dispatch = useDispatch();
  const { allCourses, loading }: IStateCourses = useSelector((state: IState) => state.courses);

  useEffect(() => {
    dispatch(getAllCourses());
  }, []);

  const mapCourses = allCourses.map((course: ICourse) => {
    return <CardCourse course={course} key={course._id} />;
  });

  const filteredCourses = useFilter(allCourses, tags);

  const mapFilteredCourses = filteredCourses?.map((course: ICourse) => {
    return <CardCourse course={course} key={course._id} />;
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <Layout title="All courses">
      <div className="courses-page">
        <Filter tags={tags} setTags={setTags} />
        {filteredCourses?.length === 0 ? "No courses by filter" : filteredCourses?.length ? mapFilteredCourses : mapCourses}
      </div>
    </Layout>
  );
};

export interface Tags {
  [key: string]: any;
  Categories: string[];
  Language: string[];
  Level: string[];
}
