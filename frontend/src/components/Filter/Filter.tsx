import React from 'react';
import './Filter.scss';
import { FilterSelect } from './FilterSelect';

const SKILLS = [
  'Design',
  'Web design',
  'UI Design',
  'UX Design',
  'Front-end',
  'Back-End',
  'Mobile-development',
  'Web-development',
  'CMS',
  'Testing',
  'Gamedev',
];
const LANGUAGE = ['Russian', 'English'];
const LEVEL = ['Intern', 'Junior', 'Middle', 'Senior'];

export const Filter = () => {
  return (
    <div className="filter">
      <div className="title">Filter by:</div>
      <div className="selects">
        <FilterSelect width="200px" options={SKILLS} title="Categories" />
        <FilterSelect width="200px" options={LANGUAGE} title="Language" />
        <FilterSelect width="200px" options={LEVEL} title="Level" />
      </div>
    </div>
  );
};
