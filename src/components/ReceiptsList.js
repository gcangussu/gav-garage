// @flow
import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getRelayEnvironment } from '../selectors';

import type { ReceiptsListQueryResponse } from './__generated__/ReceiptsListQuery.graphql';
import { createRender } from './helpers';
import { Receipt } from '.';

const ReceiptsRenderer = createRender((props: ReceiptsListQueryResponse) => (
  <section>
    <h1 className="f2 fw5 lh-copy">Recibos</h1>
    <div className="flex flex-wrap justify-around">
      {props.receipts.map(p => <Receipt key={p.id} receipt={p} />)}
    </div>
  </section>
));

const receiptsListQuery = graphql`
  query ReceiptsListQuery {
    receipts {
      id
      ...Receipt_receipt
    }
  }
`;

function ReceiptsList({ environment }) {
  return (
    <QueryRenderer
      environment={environment}
      query={receiptsListQuery}
      variables={{}}
      render={ReceiptsRenderer}
    />
  );
}

export default connect(
  createStructuredSelector({ environment: getRelayEnvironment }),
)(ReceiptsList);
