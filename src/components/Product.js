import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';

import type { Product_product } from './__generated__/Product_data.graphql';

function Product({ product }: { product: Product_product }) {
  return (
    <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
      <img
        src="http://placekitten.com/g/600/300"
        className="db w-100 br2 br--top"
        alt="Kitten looking menacing."
      />
      <div className="pa2 ph3-ns pb3-ns">
        <div className="dt w-100 mt1">
          <div className="dtc">
            <h1 className="f5 f4-ns mv0">Cat</h1>
          </div>
          <div className="dtc tr">
            <h2 className="f5 mv0">R$ {product.unitPrice}</h2>
            <h2 className="f5 mv0">{product.quantity} unidades</h2>
          </div>
        </div>
        <p className="f6 lh-copy measure mt2 mid-gray">{product.description}</p>
      </div>
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
    }
  `,
});
