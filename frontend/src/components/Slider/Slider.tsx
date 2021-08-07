import React, { useState } from 'react';
import { CardCourse } from '../CardCourse/CardCourse';
import './Slider.scss';

interface Props {
  title: string;
}

export const Slider = ({ title }: Props) => {
  const [active, setActive] = useState<Dots>({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  function changeDots(e: React.MouseEvent<HTMLDivElement>) {
    setActive({ [e.currentTarget.id]: !active[e.currentTarget.id] });
  }

  function getActiveValues(num: string): GetStyle {
    if (active[num]) {
      return {
        opacity: 1,
        scale: 1,
        visibility: 'visible',
      };
    }

    return {
      opacity: 0,
      scale: 0.8,
      visibility: 'hidden',
    };
  }

  return (
    <div className="slider">
      <div className="top">
        <div className="title">{title}</div>
        <div className="see-all">See all</div>
      </div>
      <div className="body">
        <CardCourse translateY={0} styles={getActiveValues('1')} />
        <CardCourse translateY={200} styles={getActiveValues('2')} />
        <CardCourse translateY={400} styles={getActiveValues('3')} />
        <CardCourse translateY={600} styles={getActiveValues('4')} />
        <CardCourse translateY={800} styles={getActiveValues('5')} />
      </div>
      <div className="bottom">
        <div id="1" className={active['1'] ? 'dot active' : 'dot'} onClick={(e) => changeDots(e)} />
        <div id="2" className={active['2'] ? 'dot active' : 'dot'} onClick={(e) => changeDots(e)} />
        <div id="3" className={active['3'] ? 'dot active' : 'dot'} onClick={(e) => changeDots(e)} />
        <div id="4" className={active['4'] ? 'dot active' : 'dot'} onClick={(e) => changeDots(e)} />
        <div id="5" className={active['5'] ? 'dot active' : 'dot'} onClick={(e) => changeDots(e)} />
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
