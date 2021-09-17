import React from 'react';
import './Loader.scss';

export const Loader = () => {
  return (
    <div className="loader-center">
      <div className="lds-ripple">
        <div />
        <div />
      </div>
    </div>
  );
};

export const LoaderSection = () => {
  return (
    <div className="loader-section">
      <div className="lds-ripple">
        <div />
        <div />
      </div>
    </div>
  );
};
