// @flow
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { resolve } from 'path';

import { Alert } from '../ui-components';
import { Header, ProductsList, ReceiptsList, OrdersList } from '.';

const Error404 = () => <Alert>404 NOT FOUND</Alert>;

type Props = {
  match: { url: string },
};

export default ({ match: { url } }: Props) => (
  <div className="pa3">
    <Header />
    <main>
      <Switch>
        <Route exact path={url} component={ProductsList} />
        <Route path={resolve(url, 'receipts')} component={ReceiptsList} />
        <Route path={resolve(url, 'orders')} component={OrdersList} />
        <Route component={Error404} />
      </Switch>
    </main>
  </div>
);
