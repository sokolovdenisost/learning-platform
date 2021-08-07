import React from 'react';
import './Filter.scss';
import { FilterSelect } from './FilterSelect';

export const Filter = () => {
  return (
    <div className="filter">
      <div className="title">Filter by:</div>
      <div className="selects">
        <FilterSelect title="Skills" />
        <FilterSelect title="Language" />
        <FilterSelect title="Level" />
      </div>
    </div>
  );
};
