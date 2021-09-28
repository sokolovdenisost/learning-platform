import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from './components/Loader/Loader';
import { routes } from './hooks/routes';
import { IState, IStateUser } from './interfaces/state';
import { getAuth } from './store/actions/userAction';
import './index.scss';

import './utils/i18next';

function App() {
  const dispatch = useDispatch();
  const lang = localStorage.getItem('lang');

  useEffect(() => {
    dispatch(getAuth());
  }, []);

  const user: IStateUser = useSelector((state: IState) => state.user);
  return (
    <Suspense fallback={<Loader />}>
      <div className={`app ${lang ? lang : 'en'}`}>{routes(user.loading, user.user)}</div>
    </Suspense>
  );
}

export default App;
