// @flow
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { join } from 'path';

import { Alert } from '../ui-components';
import { Header, ProductsHome, ReceiptsList, OrdersList } from '.';

const Error404 = () => <Alert>404 NOT FOUND</Alert>;

type Props = {
  match: { url: string },
};

export default function({ match: { url } }: Props) {
  const productsPath = join(url, 'products');

  return (
    <div className="pa3">
      <Header baseUrl={url} />
      <main>
        <Switch>
          <Redirect exact from={url} to={productsPath} />
          <Route path={productsPath} component={ProductsHome} />
          <Route path={join(url, 'receipts')} component={ReceiptsList} />
          <Route path={join(url, 'orders')} component={OrdersList} />
          <Route component={Error404} />
        </Switch>
      </main>
    </div>
  );
}
