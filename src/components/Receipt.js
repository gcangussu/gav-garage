// @flow
import React from 'react';
import type { Node } from 'react';
import { graphql, createFragmentContainer } from 'react-relay';

import type { Receipt_receipt } from './__generated__/Receipt_receipt.graphql';

type DetailProps = {
  label: string,
  className?: string,
  children: Node,
};

function Detail({ label, children, className = '', ...rest }: DetailProps) {
  return (
    <p className={`f5 mv1 ${className}`} {...rest}>
      <strong className="dib mv1 mr1">{label}</strong>
      <span className="dib mv1">{children}</span>
    </p>
  );
}

function Receipt({ receipt }: { receipt: Receipt_receipt }) {
  return (
    <article
      className="br2 ba b--black-10 w-100 mv4 mh2"
      style={{ maxWidth: '21rem' }}
    >
      <section className="pa2 ph3-ns pb3-ns">
        <h2 className="f4 normal lh-copy mt2 dark-gray">#{receipt.id}</h2>
        <Detail label="Produto:">{receipt.product.description}</Detail>
        <Detail label="Custo Unitário:">R$ {receipt.unitCost}</Detail>
        <Detail label="Quantidade:">{receipt.quantity} unidades</Detail>
        <Detail label="Recebido por:">{receipt.receivedBy.name}</Detail>
        <Detail label="Data:">
          {new Date(receipt.createdAt).toLocaleString()}
        </Detail>
      </section>
    </article>
  );
}

export default createFragmentContainer(Receipt, {
  receipt: graphql`
    fragment Receipt_receipt on Receipt {
      id
      unitCost
      quantity
      createdAt
      receivedBy {
        id
        name
      }
      product {
        id
        description
      }
    }
  `,
});
