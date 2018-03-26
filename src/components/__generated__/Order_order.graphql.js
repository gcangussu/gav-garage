/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
import type { FragmentReference } from 'relay-runtime';
declare export opaque type Order_order$ref: FragmentReference;
export type Order_order = {|
  +id: string,
  +createdAt: any,
  +sales: ?$ReadOnlyArray<{|
    +id: string,
    +unitPrice: number,
    +quantity: number,
    +product: {|
      +id: string,
      +description: string,
    |},
  |}>,
  +seller: {|
    +id: string,
    +name: string,
    +email: string,
  |},
  +$refType: Order_order$ref,
|};
*/


const node/*: ConcreteFragment*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "Order_order",
  "type": "Order",
  "metadata": null,
  "argumentDefinitions": [],
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
};
})();
(node/*: any*/).hash = '1837b0f3b5b47448ff566eec0551cbbe';
module.exports = node;
