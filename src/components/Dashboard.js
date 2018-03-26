// @flow
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { join } from 'path';

import { Alert } from '../ui-components';
import { Header, ProductsList, ReceiptsList, OrdersList } from '.';

const Error404 = () => <Alert>404 NOT FOUND</Alert>;

type Props = {
  match: { url: string },
};

export default ({ match: { url } }: Props) => (
  <div className="pa3">
    <Header baseUrl={url} />
    <main>
      <Switch>
        <Redirect exact from={url} to={join(url, 'products')} />
        <Route path={join(url, 'products')} component={ProductsList} />
        <Route path={join(url, 'receipts')} component={ReceiptsList} />
        <Route path={join(url, 'orders')} component={OrdersList} />
        <Route component={Error404} />
      </Switch>
    </main>
  </div>
);
