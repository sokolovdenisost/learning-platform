import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { routes } from './hooks/routes';
import { IState, IStateUser } from './interfaces/state';
import { getAuth } from './store/actions/userAction';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuth());
  }, []);

  const user: IStateUser = useSelector((state: IState) => state.user);

  return <>{routes(user.loading, user.user)}</>;
}

export default App;
