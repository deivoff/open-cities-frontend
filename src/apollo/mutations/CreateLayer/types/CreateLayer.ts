/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ACCESS_CODE, USER_ROLE } from "./../../../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateLayer
// ====================================================

export interface CreateLayer_createLayer_owner {
  __typename: "User";
  role: USER_ROLE;
}

export interface CreateLayer_createLayer {
  __typename: "Layer";
  _id: any;
  name: string;
  description: string;
  configuration: any;
  access: ACCESS_CODE;
  owner: CreateLayer_createLayer_owner;
}

export interface CreateLayer {
  createLayer: CreateLayer_createLayer;
}

export interface CreateLayerVariables {
  name: string;
  description: string;
  configuration: any;
  mapId: any;
}
