/**
 * @flow
 * @relayHash 5678e7a0f095f3601faed1db98fa42c0
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type Receipt_receipt$ref = any;
export type ReceiptsListQueryVariables = {| |};
export type ReceiptsListQueryResponse = {|
  +receipts: $ReadOnlyArray<{|
    +id: string,
    +$fragmentRefs: Receipt_receipt$ref,
  |}>,
|};
*/


/*
query ReceiptsListQuery {
  receipts {
    id
    ...Receipt_receipt
  }
}

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
  "name": "ReceiptsListQuery",
  "id": null,
  "text": "query ReceiptsListQuery {\n  receipts {\n    id\n    ...Receipt_receipt\n  }\n}\n\nfragment Receipt_receipt on Receipt {\n  id\n  unitCost\n  quantity\n  createdAt\n  receivedBy {\n    id\n    name\n  }\n  product {\n    id\n    description\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ReceiptsListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "receipts",
        "storageKey": null,
        "args": null,
        "concreteType": "Receipt",
        "plural": true,
        "selections": [
          v0,
          {
            "kind": "FragmentSpread",
            "name": "Receipt_receipt",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ReceiptsListQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "receipts",
        "storageKey": null,
        "args": null,
        "concreteType": "Receipt",
        "plural": true,
        "selections": [
          v0,
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "unitCost",
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
            "kind": "ScalarField",
            "alias": null,
            "name": "createdAt",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "receivedBy",
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
              }
            ]
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
      }
    ]
  }
};
})();
(node/*: any*/).hash = '689b1b00118d092003b3ae0f0708f9d0';
module.exports = node;
