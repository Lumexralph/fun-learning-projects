import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import getDataFromStorage from '../../helpers/getDataFromStorage';

const ProtectProfileRoute = ({ component: Component, ...rest }) => {
  const admin = getDataFromStorage('admin');

  return (
    <Route
      {...rest}
      render={(props) => {
        if (admin === 'false') {
          return (
            <Component {...props} />
          );
        }
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        );
      }
      }
    />);
};

export default ProtectProfileRoute;
