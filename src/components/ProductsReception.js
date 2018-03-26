// @flow
import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import type { RelayProp } from 'react-relay';
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { promiseMutation } from '../relay';
import type { ProductsReception_products } from './__generated__/ProductsReception_products.graphql';
import Form, { selector } from './ProductsReceptionForm';

type Props = {
  products: ProductsReception_products,
  relay: RelayProp,
};

class ProductsReception extends React.Component<Props> {
  handleSubmit = values => {
    const { productId, quantity, unitCost } = values;

    return promiseMutation(this.props.relay.environment, {
      mutation: graphql`
        mutation ProductsReceptionMutation(
          $product: ReceiveProductInput!
          $quantity: Int!
          $unitCost: Float!
        ) {
          receive(product: $product, quantity: $quantity, unitCost: $unitCost) {
            receipt {
              id
            }
          }
        }
      `,
      variables: {
        product:
          productId !== '_new' ? { id: productId } : { create: values.product },
        quantity,
        unitCost,
      },
    }).catch(error => {
      throw new SubmissionError({
        _error: (error && error.message) || 'Unknown error',
      });
    });
  };

  render() {
    return (
      <Form
        className="measure center"
        onSubmit={this.handleSubmit}
        {...this.props}
      />
    );
  }
}

const EnhancedProductsReception = connect(
  createStructuredSelector({
    isNewProduct: state => selector(state, 'productId') === '_new',
  }),
)(ProductsReception);

export default createFragmentContainer(EnhancedProductsReception, {
  products: graphql`
    fragment ProductsReception_products on Product @relay(plural: true) {
      id
      description
    }
  `,
});
