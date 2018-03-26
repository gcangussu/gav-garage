/**
 * @flow
 * @relayHash 9933a2df95ab6c3f5faf75c89a74bc8f
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type Order_order$ref = any;
export type OrdersListQueryVariables = {| |};
export type OrdersListQueryResponse = {|
  +orders: $ReadOnlyArray<{|
    +id: string,
    +$fragmentRefs: Order_order$ref,
  |}>,
|};
*/


/*
query OrdersListQuery {
  orders {
    id
    ...Order_order
  }
}

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
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "OrdersListQuery",
  "id": null,
  "text": "query OrdersListQuery {\n  orders {\n    id\n    ...Order_order\n  }\n}\n\nfragment Order_order on Order {\n  id\n  createdAt\n  sales {\n    id\n    unitPrice\n    quantity\n    product {\n      id\n      description\n    }\n  }\n  seller {\n    id\n    name\n    email\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "OrdersListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "orders",
        "storageKey": null,
        "args": null,
        "concreteType": "Order",
        "plural": true,
        "selections": [
          v0,
          {
            "kind": "FragmentSpread",
            "name": "Order_order",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "OrdersListQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "orders",
        "storageKey": null,
        "args": null,
        "concreteType": "Order",
        "plural": true,
        "selections": [
          v0,
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "createdAt",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "sales",
            "storageKey": null,
            "args": null,
            "concreteType": "Sale",
            "plural": true,
            "selections": [
              v0,
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "unitPrice",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "quantity",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "product",
                "storageKey": null,
                "args": null,
                "concreteType": "Product",
                "plural": false,
                "selections": [
                  v0,
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "description",
                    "args": null,
                    "storageKey": null
                  }
                ]
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "seller",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": false,
            "selections": [
              v0,
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "name",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "email",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      }
    ]
  }
};
})();
(node/*: any*/).hash = '66e050265b324aa23c91554110d2be4d';
module.exports = node;
