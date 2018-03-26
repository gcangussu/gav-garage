// @flow
import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getRelayEnvironment } from '../selectors';

import type { OrdersListQueryResponse } from './__generated__/OrdersListQuery.graphql';
import { createRender } from './helpers';
import { Order } from '.';

const OrdersRenderer = createRender((props: OrdersListQueryResponse) => (
  <section>
    <h1 className="f2 fw5 lh-copy">Ordens</h1>
    <div className="flex flex-wrap justify-around">
      {props.orders.map(p => <Order key={p.id} order={p} />)}
    </div>
  </section>
));

const ordersListQuery = graphql`
  query OrdersListQuery {
    orders {
      id
      ...Order_order
    }
  }
`;

function OrdersList({ environment }) {
  return (
    <QueryRenderer
      environment={environment}
      query={ordersListQuery}
      variables={{}}
      render={OrdersRenderer}
    />
  );
}

export default connect(
  createStructuredSelector({ environment: getRelayEnvironment }),
)(OrdersList);
