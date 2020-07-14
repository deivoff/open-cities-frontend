/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ACCESS_CODE } from "./../../../../../types/globalTypes";

// ====================================================
// GraphQL query operation: GetMap
// ====================================================

export interface GetMap_map_layers {
  __typename: "Layer";
  name: string;
  description: string;
  configuration: any;
}

export interface GetMap_map {
  __typename: "Map";
  layers: GetMap_map_layers[];
  access: ACCESS_CODE;
}

export interface GetMap {
  map: GetMap_map | null;
}

export interface GetMapVariables {
  id: any;
}
