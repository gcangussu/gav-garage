/**
 * @flow
 * @relayHash 92a2a370e29a96dc8782e1b680656364
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ProductsSalesMutationVariables = {|
  order: $ReadOnlyArray<{
    productId: string,
    unitPrice: number,
    quantity: number,
  }>,
|};
export type ProductsSalesMutationResponse = {|
  +sell: {|
    +order: {|
      +id: string,
    |},
  |},
|};
*/


/*
mutation ProductsSalesMutation(
  $order: [SellOrder!]!
) {
  sell(order: $order) {
    order {
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "order",
    "type": "[SellOrder!]!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "sell",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "order",
        "variableName": "order",
        "type": "[SellOrder!]!"
      }
    ],
    "concreteType": "SellResponse",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "order",
        "storageKey": null,
        "args": null,
        "concreteType": "Order",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "ProductsSalesMutation",
  "id": null,
  "text": "mutation ProductsSalesMutation(\n  $order: [SellOrder!]!\n) {\n  sell(order: $order) {\n    order {\n      id\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ProductsSalesMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "ProductsSalesMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node/*: any*/).hash = 'abd9d3c9d445f3fb48e08a4a93f74304';
module.exports = node;
