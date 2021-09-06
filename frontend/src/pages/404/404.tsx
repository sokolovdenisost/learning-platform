import React from 'react';
import { Button } from '../../components/Button/Button';
import { useHistory } from 'react-router';
import './404.scss';

export const Error404 = () => {
  const history = useHistory();
  return (
    <div className="error-page">
      <div className="error-code">404</div>
      <div className="error-text">Page not found</div>
      <div className="error-goback">
        <Button type="bold" color="main" fontSize="16" onClick={() => history.goBack()}>
          Go back
        </Button>
      </div>
    </div>
  );
};
