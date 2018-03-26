// @flow
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { Link } from 'react-router-dom';

import type { ProductsList_products } from './__generated__/ProductsList_products.graphql';
import { Product } from '.';

function ProductsList(props: { products: ProductsList_products }) {
  return (
    <section>
      <div className="dt">
        <h1 className="dtc f2 fw5 lh-copy">Produtos</h1>
        <div className="dtc v-mid">
          <Link
            className="ml4 link f6 dim ph3 pv2 dib white bg-dark-blue bw0 pointer"
            to="/products/reception"
          >
            ➕ Receber Produtos
          </Link>
          <Link
            className="ml4 link f6 dim ph3 pv2 dib white bg-dark-green bw0 pointer"
            to="/products/sales"
          >
            ➖ Vender Produtos
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap justify-around">
        {props.products.map(p => <Product key={p.id} product={p} />)}
      </div>
    </section>
  );
}

export default createFragmentContainer(ProductsList, {
  products: graphql`
    fragment ProductsList_products on Product @relay(plural: true) {
      id
      ...Product_product
    }
  `,
});
