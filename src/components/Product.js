// @flow
import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';

import type { Product_product } from './__generated__/Product_product.graphql';

function Product({ product }: { product: Product_product }) {
  return (
    <article className="br2 ba b--black-10 w-100 mv4 mh2 mw5">
      <div className="aspect-ratio aspect-ratio--8x5">
        <div
          className="aspect-ratio--object cover br2 br--top"
          style={{
            background: `url(${product.picture}) center`,
          }}
        />
      </div>
      <section className="pa2 ph3-ns pb3-ns">
        <h2 className="f4 normal lh-copy measure mt2 dark-gray">
          {product.description}
        </h2>
        <p className="f5 mv1 b">R$ {product.unitPrice}</p>
        <p className="f5 mv1 b">
          {product.quantity} unidade{product.quantity && 's'}
        </p>
      </section>
    </article>
  );
}

export default createFragmentContainer(Product, {
  product: graphql`
    fragment Product_product on Product {
      id
      description
      unitPrice
      quantity
      picture
    }
  `,
});
