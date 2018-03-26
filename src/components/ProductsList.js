// @flow
import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getRelayEnvironment } from '../selectors';

import type { ProductsListQueryResponse } from './__generated__/ProductsListQuery.graphql';
import { createRender } from './helpers';
import { Product } from '.';

const ProductsRenderer = createRender((props: ProductsListQueryResponse) => (
  <section>
    <h1 className="f2 fw5 lh-copy">Produtos</h1>
    <div className="flex flex-wrap justify-around">
      {props.products.map(p => <Product key={p.id} product={p} />)}
    </div>
  </section>
));

const productsListQuery = graphql`
  query ProductsListQuery {
    products {
      id
      ...Product_product
    }
  }
`;

function ProductsList({ environment }) {
  return (
    <QueryRenderer
      environment={environment}
      query={productsListQuery}
      variables={{}}
      render={ProductsRenderer}
    />
  );
}

export default connect(
  createStructuredSelector({ environment: getRelayEnvironment }),
)(ProductsList);
