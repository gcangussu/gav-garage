/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
import type { FragmentReference } from 'relay-runtime';
declare export opaque type ProductsReception_products$ref: FragmentReference;
export type ProductsReception_products = $ReadOnlyArray<{|
  +id: string,
  +description: string,
  +$refType: ProductsReception_products$ref,
|}>;
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "ProductsReception_products",
  "type": "Product",
  "metadata": {
    "plural": true
  },
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "description",
      "args": null,
      "storageKey": null
    }
  ]
};
(node/*: any*/).hash = 'abf4e6e8d7b434d4359cd204b8336cdb';
module.exports = node;
