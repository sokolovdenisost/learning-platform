import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { routes } from './hooks/routes';
import { getAuth } from './store/actions/userAction';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuth());
  }, []);

  const user = useSelector((state: any) => state.user);

  return <>{routes(user.loading, user.user)}</>;
}

export default App;
