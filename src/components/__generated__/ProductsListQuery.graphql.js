/**
 * @flow
 * @relayHash 11751e46c450ca4c128efbbe066bbcf9
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type Product_product$ref = any;
export type ProductsListQueryVariables = {| |};
export type ProductsListQueryResponse = {|
  +products: $ReadOnlyArray<{|
    +id: string,
    +$fragmentRefs: Product_product$ref,
  |}>,
|};
*/


/*
query ProductsListQuery {
  products {
    id
    ...Product_product
  }
}

fragment Product_product on Product {
  id
  description
  unitPrice
  quantity
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
  "name": "ProductsListQuery",
  "id": null,
  "text": "query ProductsListQuery {\n  products {\n    id\n    ...Product_product\n  }\n}\n\nfragment Product_product on Product {\n  id\n  description\n  unitPrice\n  quantity\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ProductsListQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "products",
        "storageKey": null,
        "args": null,
        "concreteType": "Product",
        "plural": true,
        "selections": [
          v0,
          {
            "kind": "FragmentSpread",
            "name": "Product_product",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ProductsListQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "products",
        "storageKey": null,
        "args": null,
        "concreteType": "Product",
        "plural": true,
        "selections": [
          v0,
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "description",
            "args": null,
            "storageKey": null
          },
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
          }
        ]
      }
    ]
  }
};
})();
(node/*: any*/).hash = '1f2b42d3e5aa8a2b8263387fca07b11f';
module.exports = node;
