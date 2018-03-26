/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
import type { FragmentReference } from 'relay-runtime';
declare export opaque type Receipt_receipt$ref: FragmentReference;
export type Receipt_receipt = {|
  +id: string,
  +unitCost: number,
  +quantity: number,
  +createdAt: any,
  +receivedBy: {|
    +id: string,
    +name: string,
  |},
  +product: {|
    +id: string,
    +description: string,
  |},
  +$refType: Receipt_receipt$ref,
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
  "name": "Receipt_receipt",
  "type": "Receipt",
  "metadata": null,
  "argumentDefinitions": [],
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
};
})();
(node/*: any*/).hash = '8148efa66069553fd2ad84cc9d7f8c81';
module.exports = node;
