/**
 * @flow
 * @relayHash d1d1b423897cb1831f595af8dd0f5c8c
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ProductsList_products$ref = any;
type ProductsReception_products$ref = any;
type ProductsSales_products$ref = any;
export type ProductsHomeQueryVariables = {| |};
export type ProductsHomeQueryResponse = {|
  +products: $ReadOnlyArray<{|
    +$fragmentRefs: (ProductsList_products$ref & ProductsReception_products$ref & ProductsSales_products$ref),
  |}>,
|};
*/


/*
query ProductsHomeQuery {
  products {
    ...ProductsList_products
    ...ProductsReception_products
    ...ProductsSales_products
    id
  }
}

fragment ProductsList_products on Product {
  id
  ...Product_product
}

fragment ProductsReception_products on Product {
  id
  description
}

fragment ProductsSales_products on Product {
  id
  description
}

fragment Product_product on Product {
  id
  description
  unitPrice
  quantity
  picture
}
*/

const node/*: ConcreteRequest*/ = {
  "kind": "Request",
  "operationKind": "query",
  "name": "ProductsHomeQuery",
  "id": null,
  "text": "query ProductsHomeQuery {\n  products {\n    ...ProductsList_products\n    ...ProductsReception_products\n    ...ProductsSales_products\n    id\n  }\n}\n\nfragment ProductsList_products on Product {\n  id\n  ...Product_product\n}\n\nfragment ProductsReception_products on Product {\n  id\n  description\n}\n\nfragment ProductsSales_products on Product {\n  id\n  description\n}\n\nfragment Product_product on Product {\n  id\n  description\n  unitPrice\n  quantity\n  picture\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ProductsHomeQuery",
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
          {
            "kind": "FragmentSpread",
            "name": "ProductsList_products",
            "args": null
          },
          {
            "kind": "FragmentSpread",
            "name": "ProductsReception_products",
            "args": null
          },
          {
            "kind": "FragmentSpread",
            "name": "ProductsSales_products",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ProductsHomeQuery",
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
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "picture",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
};
(node/*: any*/).hash = '370be035c34654e7bffa837cdbafb1d2';
module.exports = node;
