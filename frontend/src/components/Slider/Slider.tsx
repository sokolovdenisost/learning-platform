import React, { useState } from "react";
import { ICourse } from "../../interfaces/course";
import { CardCourse } from "../CardCourse/CardCourse";
import "./Slider.scss";

interface Props {
  title: string;
  link: string;
  courses: ICourse[];
}

export const Slider = ({ title, link, courses }: Props) => {
  const [active, setActive] = useState<Dots>({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  function changeDots(e: React.MouseEvent<HTMLDivElement>) {
    Object.keys(active).forEach((c) => (active[c] = false));
    setActive({ [e.currentTarget.id]: true });
  }

  function getActiveValues(num: string): GetStyle {
    if (active[num]) {
      return {
        opacity: 1,
        scale: 1,
        visibility: "visible",
      };
    }

    return {
      opacity: 0,
      scale: 0.8,
      visibility: "hidden",
    };
  }

  const mapCourses = courses.map((course, index) => {
    return <CardCourse key={course._id} course={course} translateY={index * 200} styles={getActiveValues(String(index + 1))} />;
  });

  const mapDots = courses.map((_, index) => {
    return <div id={String(index + 1)} key={index} className={active[index + 1] ? "dot active" : "dot"} onClick={(e) => changeDots(e)} />;
  });

  return (
    <div className="slider">
      <div className="top">
        <div className="title">{title}</div>
        <a className="see-all" href={link}>
          See all
        </a>
      </div>
      <div className="body">{mapCourses}</div>
      <div className="bottom">
        {mapDots}
        {/* <div id="1" className={active["1"] ? "dot active" : "dot"} onClick={(e) => changeDots(e)} />
        <div id="2" className={active["2"] ? "dot active" : "dot"} onClick={(e) => changeDots(e)} />
        <div id="3" className={active["3"] ? "dot active" : "dot"} onClick={(e) => changeDots(e)} />
        <div id="4" className={active["4"] ? "dot active" : "dot"} onClick={(e) => changeDots(e)} />
        <div id="5" className={active["5"] ? "dot active" : "dot"} onClick={(e) => changeDots(e)} /> */}
      </div>
    </div>
  );
};

interface Dots {
  [key: string]: boolean;
}

interface GetStyle {
  scale: number;
  opacity: number;
  visibility: VisibilityState;
}
