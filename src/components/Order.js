// @flow
import * as React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';

import type { Order_order } from './__generated__/Order_order.graphql';

function Order({ order }: { order: Order_order }) {
  const { sales } = order;

  if (!sales || sales.length === 0) {
    return <div>Error: No sales on this order</div>;
  }

  const saleTotalMap: { [id: string]: number } = {};
  sales.forEach(s => {
    saleTotalMap[s.id] = s.unitPrice * s.quantity;
  });

  const total = sales.reduce((t, s) => t + saleTotalMap[s.id], 0);

  const salesRender = sales.map(s => (
    <tr key={s.id}>
      <td className="pb1">{s.product.description}</td>
      <td className="pb1">{s.quantity}</td>
      <td className="pb1">R$ {s.unitPrice}</td>
      <td className="pb1">R$ {saleTotalMap[s.id]}</td>
    </tr>
  ));

  return (
    <article
      key={order.id}
      className="br2 ba b--black-10 w-100 mv4 mh2"
      style={{ maxWidth: '37rem' }}
    >
      <div className="pa2 ph3-ns pb3-ns">
        <p className="f4 lh-copy mt2 dark-gray">#{order.id}</p>
        <p className="f5 mv2">
          <strong>Vendedor:</strong>{' '}
          <span className="dib">
            {order.seller.name} ({order.seller.email})
          </span>
        </p>
        <p className="f5 mv2">
          <strong>Data:</strong>{' '}
          <span className="dib">
            {new Date(order.createdAt).toLocaleString()}
          </span>
        </p>
        <p className="f5 mv2">
          <strong>Total:</strong> <span className="dib">R$ {total}</span>
        </p>
        <table className="collapse w-100 mt3">
          <tbody>
            <tr className="tl">
              <th className="pb1">Produto</th>
              <th className="pb1">Quant.</th>
              <th className="pb1">Valor unit.</th>
              <th className="pb1">Total</th>
            </tr>
            {salesRender}
          </tbody>
        </table>
      </div>
    </article>
  );
}

export default createFragmentContainer(Order, {
  order: graphql`
    fragment Order_order on Order {
      id
      createdAt
      sales {
        id
        unitPrice
        quantity
        product {
          id
          description
        }
      }
      seller {
        id
        name
        email
      }
    }
  `,
});
