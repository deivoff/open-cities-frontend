/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ACCESS_CODE, USER_ROLE } from "./../../../../../types/globalTypes";

// ====================================================
// GraphQL query operation: GetLayers
// ====================================================

export interface GetLayers_layers_owner {
  __typename: "User";
  role: USER_ROLE;
}

export interface GetLayers_layers {
  __typename: "Layer";
  _id: string;
  name: string;
  description: string;
  settings: any;
  access: ACCESS_CODE;
  owner: GetLayers_layers_owner;
}

export interface GetLayers {
  layers: GetLayers_layers[];
}

export interface GetLayersVariables {
  mapId: string;
}
