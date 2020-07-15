/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ACCESS_CODE, USER_ROLE } from "./../../../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateLayerForMap
// ====================================================

export interface CreateLayerForMap_createLayerForMap_owner {
  __typename: "User";
  role: USER_ROLE;
}

export interface CreateLayerForMap_createLayerForMap {
  __typename: "Layer";
  _id: any;
  name: string;
  description: string;
  configuration: any;
  access: ACCESS_CODE;
  owner: CreateLayerForMap_createLayerForMap_owner;
}

export interface CreateLayerForMap {
  createLayerForMap: CreateLayerForMap_createLayerForMap;
}

export interface CreateLayerForMapVariables {
  name: string;
  description: string;
  configuration: any;
  mapId: any;
}
