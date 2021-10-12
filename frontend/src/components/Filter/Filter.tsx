import React from "react";
import { Tags } from "../../pages/Courses/Courses";
import "./Filter.scss";
import { FilterSelect } from "./FilterSelect";

const SKILLS = [
  "Web design",
  "Design",
  "UI Design",
  "UX Design",
  "Web development",
  "Front-end",
  "Back-end",
  "Mobile development",
  "CMS",
  "Gamedev",
  "Testing",
];
const LANGUAGE = ["Russian", "English"];
const LEVEL = ["Trainee", "Junior", "Middle", "Senior"];

interface Props {
  setTags: React.Dispatch<React.SetStateAction<Tags>>;
  tags: Tags;
}

export const Filter = ({ setTags, tags }: Props) => {
  return (
    <div className="filter">
      <div className="title">Filter by:</div>
      <div className="selects">
        <FilterSelect width="200px" setTags={setTags} tags={tags} options={SKILLS} title="Categories" />
        <FilterSelect width="200px" setTags={setTags} tags={tags} options={LANGUAGE} title="Language" />
        <FilterSelect width="200px" setTags={setTags} tags={tags} options={LEVEL} title="Level" />
      </div>
    </div>
  );
};
