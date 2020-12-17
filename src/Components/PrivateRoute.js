import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../Context/UserContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? <Redirect to='/' /> : <Component {...props} />;
      }}
    ></Route>
  );
};

export default PrivateRoute;
