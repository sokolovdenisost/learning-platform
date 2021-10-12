import React, { useEffect, useRef, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { BiCheck } from "react-icons/bi";
import "./Filter.scss";
import { Tags } from "../../pages/Courses/Courses";

interface Props {
  title: string;
  options: Array<string>;
  width: string;
  setTags: React.Dispatch<React.SetStateAction<Tags>>;
  tags: Tags;
}

export const FilterSelect = ({ title, options, width, setTags, tags }: Props) => {
  const [active, setActive] = useState(false);
  const rootEl = useRef<any>(null);

  useEffect(() => {
    const onClick = (e: any) => {
      if (rootEl.current) {
        return rootEl.current.contains(e.target) || setActive(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  function setOption(e: React.MouseEvent<HTMLDivElement>) {
    if (tags[title].find((c: string) => c === e.currentTarget.dataset.value)) {
      setTags({ ...tags, [title]: tags[title].filter((c: string) => c !== e.currentTarget.dataset.value) });
    } else {
      setTags({ ...tags, [title]: [...tags[title], e.currentTarget.dataset.value] });
    }
  }

  function getSelect(title: string, tags: string[]) {
    if (tags.find((c: string) => c === title)) {
      return (
        <>
          {title} <BiCheck size={24} />
        </>
      );
    }

    return title;
  }

  return (
    <div ref={rootEl} className="filter-block" style={{ width }}>
      <div className={active ? "filter-select active" : "filter-select"} onClick={() => setActive(!active)}>
        <div className="title">{title}</div>
        <div className={active ? "arrow active" : "arrow"}>
          <RiArrowDownSLine size={24} />
        </div>
      </div>
      <div className={active ? "wrapper active" : "wrapper"}>
        {options.map((o) => {
          return (
            <div data-value={o} key={o} className="option" onClick={(e) => setOption(e)}>
              {getSelect(o, tags[title])}
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface Active {
  tags: Array<string | undefined>;
  active: boolean;
}
