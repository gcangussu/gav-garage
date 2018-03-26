/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
type Product_product$ref = any;
import type { FragmentReference } from 'relay-runtime';
declare export opaque type ProductsList_products$ref: FragmentReference;
export type ProductsList_products = $ReadOnlyArray<{|
  +id: string,
  +$fragmentRefs: Product_product$ref,
  +$refType: ProductsList_products$ref,
|}>;
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "ProductsList_products",
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
      "kind": "FragmentSpread",
      "name": "Product_product",
      "args": null
    }
  ]
};
(node/*: any*/).hash = '225202f2303196d5083aebf30204d77b';
module.exports = node;
