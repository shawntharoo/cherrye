import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRouteComponent = ({ component: Component, isAuthenticated, ...rest }) => 
    (
        <Route
         {...rest}
          render={(props) => (
            (isAuthenticated.username)
              ? <Component />
              : <Redirect to={{ pathname: "/login", state: {from: props.location} }} />
          )}
        />
      );
  
  export default ProtectedRouteComponent;