/**
 * @flow
 * @relayHash b6c741d222d7127bf0ccac7437761488
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ProductsReceptionMutationVariables = {|
  product: {
    id?: ?string,
    create?: ?{
      description: string,
      picture: string,
      unitPrice: number,
    },
  },
  quantity: number,
  unitCost: number,
|};
export type ProductsReceptionMutationResponse = {|
  +receive: {|
    +receipt: {|
      +id: string,
    |},
  |},
|};
*/


/*
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
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "product",
    "type": "ReceiveProductInput!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "quantity",
    "type": "Int!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "unitCost",
    "type": "Float!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "receive",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "product",
        "variableName": "product",
        "type": "ReceiveProductInput!"
      },
      {
        "kind": "Variable",
        "name": "quantity",
        "variableName": "quantity",
        "type": "Int!"
      },
      {
        "kind": "Variable",
        "name": "unitCost",
        "variableName": "unitCost",
        "type": "Float!"
      }
    ],
    "concreteType": "ReceiveResponse",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "receipt",
        "storageKey": null,
        "args": null,
        "concreteType": "Receipt",
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
  "name": "ProductsReceptionMutation",
  "id": null,
  "text": "mutation ProductsReceptionMutation(\n  $product: ReceiveProductInput!\n  $quantity: Int!\n  $unitCost: Float!\n) {\n  receive(product: $product, quantity: $quantity, unitCost: $unitCost) {\n    receipt {\n      id\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ProductsReceptionMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "ProductsReceptionMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node/*: any*/).hash = '39e48617c794fe7b18bbfa7887a0c792';
module.exports = node;
