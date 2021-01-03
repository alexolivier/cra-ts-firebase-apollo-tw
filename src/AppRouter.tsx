import React, { useContext } from 'react';
import { Router } from '@reach/router';
import { Login } from './containers/Login';
import { NotFound } from './containers/NotFound';
import { UserContext } from './providers/UserProvider';

export const AppRouter = () => {
  const user = useContext(UserContext);
  if (!user.initialized) {
    return <div>Initializing...</div>;
  }
  return (
    <Router>
      <Login path='/login' />
      {user.loggedIn ? (
        <>
          <NotFound default />
        </>
      ) : (
        <Login default />
      )}
    </Router>
  );
};
