// @flow
import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { join } from 'path';

import { getRelayEnvironment } from '../selectors';

import { renderState } from './helpers';
import { ProductsList, ProductsReception, ProductsSales } from '.';

function ProductsRoutes({ match: { url }, products }) {
  return (
    <Switch>
      <Route
        exact
        path={url}
        render={() => <ProductsList products={products} />}
      />
      <Route
        path={join(url, 'reception')}
        render={() => <ProductsReception products={products} />}
      />
      <Route
        path={join(url, 'sales')}
        render={() => <ProductsSales products={products} />}
      />
    </Switch>
  );
}

function ProductsHome({ environment, match }) {
  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query ProductsHomeQuery {
          products {
            ...ProductsList_products
            ...ProductsReception_products
            ...ProductsSales_products
          }
        }
      `}
      variables={{}}
      render={({ props, error }) => {
        const state = renderState(props, error);
        return state || <ProductsRoutes match={match} {...props} />;
      }}
    />
  );
}

export default connect(
  createStructuredSelector({ environment: getRelayEnvironment }),
)(ProductsHome);
