import React from 'react';
import { useAuth } from './hooks/auth';
import { routes } from './hooks/routes';

function App() {
  const auth = useAuth();
  return <>{routes(auth.loading, auth.user)}</>;
}

export default App;
