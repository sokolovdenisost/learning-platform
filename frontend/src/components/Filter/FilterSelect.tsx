import React, { useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import { BiCheck } from 'react-icons/bi';
import './Filter.scss';

interface Props {
  title: string;
}

export const FilterSelect = ({ title }: Props) => {
  const [active, setActive] = useState<Active>({
    tags: [],
    active: false,
  });

  function setOption(e: React.MouseEvent<HTMLDivElement>) {
    // Можно сделать чтобы не сразу же закрывалось
    if (active.tags.find((c) => c === e.currentTarget.dataset.value)) {
      setActive({ ...active, tags: active.tags.filter((c) => c !== e.currentTarget.dataset.value), active: !active.active });
    } else {
      setActive({ ...active, tags: [...active.tags, e.currentTarget.dataset.value], active: !active.active });
    }
  }

  function getSelect(title: string) {
    if (active.tags.find((c) => c === title)) {
      return (
        <>
          {title} <BiCheck size={24} />
        </>
      );
    }

    return title;
  }

  return (
    <div className="filter-block">
      <div className={active.active ? 'filter-select active' : 'filter-select'} onClick={() => setActive({ ...active, active: !active.active })}>
        <div className="title">{title}</div>
        <div className="arrow">
          <RiArrowDownSLine size={24} />
        </div>
      </div>
      <div className={active.active ? 'wrapper active' : 'wrapper'}>
        <div data-value="Front-end" className="option" onClick={(e) => setOption(e)}>
          {getSelect('Front-end')}
        </div>
        <div data-value="Back-end" className="option" onClick={(e) => setOption(e)}>
          {getSelect('Back-end')}
        </div>
        <div data-value="Design" className="option" onClick={(e) => setOption(e)}>
          {getSelect('Design')}
        </div>
      </div>
    </div>
  );
};

interface Active {
  tags: Array<string | undefined>;
  active: boolean;
}
