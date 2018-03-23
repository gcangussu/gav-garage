import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Alert } from '../ui-components';
import { Header, ProductsList } from '.';

const Error404 = () => <Alert>404 NOT FOUND</Alert>;

export default ({ match }) => (
  <div className="pa3">
    <Header />
    <main>
      <Switch>
        <Route exact path={match.url} component={ProductsList} />
        <Route component={Error404} />
      </Switch>
    </main>
  </div>
);
