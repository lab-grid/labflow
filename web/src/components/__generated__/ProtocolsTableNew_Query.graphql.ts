/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ProtocolsTableNew_QueryVariables = {
    run?: number | null;
    plate?: string | null;
    reagent?: string | null;
    sample?: string | null;
    creator?: string | null;
    archived?: boolean | null;
    page?: number | null;
    perPage?: number | null;
};
export type ProtocolsTableNew_QueryResponse = {
    readonly allProtocols: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly " $fragmentRefs": FragmentRefs<"ProtocolsTableNew_protocol">;
            } | null;
        } | null>;
        readonly " $fragmentRefs": FragmentRefs<"ProtocolsTableNew_pagerData">;
    } | null;
};
export type ProtocolsTableNew_Query = {
    readonly response: ProtocolsTableNew_QueryResponse;
    readonly variables: ProtocolsTableNew_QueryVariables;
};



/*
query ProtocolsTableNew_Query(
  $run: Int
  $plate: String
  $reagent: String
  $sample: String
  $creator: String
  $archived: Boolean
  $page: Int
  $perPage: Int
) {
  allProtocols(run: $run, plate: $plate, reagent: $reagent, sample: $sample, creator: $creator, archived: $archived, page: $page, perPage: $perPage) {
    ...ProtocolsTableNew_pagerData
    edges {
      node {
        id
        ...ProtocolsTableNew_protocol
      }
    }
  }
}

fragment ProtocolsTableNew_pagerData on ProtocolConnection {
  page
  pageCount
}

fragment ProtocolsTableNew_protocol on ProtocolNode {
  protocolId
  name
  createdBy
  createdOn
  updatedOn
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "archived"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "creator"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "page"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "perPage"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "plate"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "reagent"
},
v6 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "run"
},
v7 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "sample"
},
v8 = [
  {
    "kind": "Variable",
    "name": "archived",
    "variableName": "archived"
  },
  {
    "kind": "Variable",
    "name": "creator",
    "variableName": "creator"
  },
  {
    "kind": "Variable",
    "name": "page",
    "variableName": "page"
  },
  {
    "kind": "Variable",
    "name": "perPage",
    "variableName": "perPage"
  },
  {
    "kind": "Variable",
    "name": "plate",
    "variableName": "plate"
  },
  {
    "kind": "Variable",
    "name": "reagent",
    "variableName": "reagent"
  },
  {
    "kind": "Variable",
    "name": "run",
    "variableName": "run"
  },
  {
    "kind": "Variable",
    "name": "sample",
    "variableName": "sample"
  }
],
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/),
      (v6/*: any*/),
      (v7/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ProtocolsTableNew_Query",
    "selections": [
      {
        "alias": null,
        "args": (v8/*: any*/),
        "concreteType": "ProtocolConnection",
        "kind": "LinkedField",
        "name": "allProtocols",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ProtocolEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ProtocolNode",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v9/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "ProtocolsTableNew_protocol"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ProtocolsTableNew_pagerData"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v6/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/),
      (v7/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Operation",
    "name": "ProtocolsTableNew_Query",
    "selections": [
      {
        "alias": null,
        "args": (v8/*: any*/),
        "concreteType": "ProtocolConnection",
        "kind": "LinkedField",
        "name": "allProtocols",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "page",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "pageCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ProtocolEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ProtocolNode",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v9/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "protocolId",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "createdBy",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "createdOn",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "updatedOn",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "85febddabd9704296a4459a774450500",
    "id": null,
    "metadata": {},
    "name": "ProtocolsTableNew_Query",
    "operationKind": "query",
    "text": "query ProtocolsTableNew_Query(\n  $run: Int\n  $plate: String\n  $reagent: String\n  $sample: String\n  $creator: String\n  $archived: Boolean\n  $page: Int\n  $perPage: Int\n) {\n  allProtocols(run: $run, plate: $plate, reagent: $reagent, sample: $sample, creator: $creator, archived: $archived, page: $page, perPage: $perPage) {\n    ...ProtocolsTableNew_pagerData\n    edges {\n      node {\n        id\n        ...ProtocolsTableNew_protocol\n      }\n    }\n  }\n}\n\nfragment ProtocolsTableNew_pagerData on ProtocolConnection {\n  page\n  pageCount\n}\n\nfragment ProtocolsTableNew_protocol on ProtocolNode {\n  protocolId\n  name\n  createdBy\n  createdOn\n  updatedOn\n}\n"
  }
};
})();
(node as any).hash = '9d19cfee13a67b729d9b43ece3be6910';
export default node;
