import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { isAuthenticated as isAuthSel } from '../selectors';

type Props = { isAuthenticated: boolean };

function PrivateRoute(props: Props) {
  const { isAuthenticated, component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={p =>
        isAuthenticated ? (
          <Component {...p} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: p.location } }} />
        )
      }
    />
  );
}

export default connect(
  createStructuredSelector({ isAuthenticated: isAuthSel }),
)(PrivateRoute);
