/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateLayer
// ====================================================

export interface CreateLayer_createLayer {
  __typename: "Layer";
  _id: string;
  name: string;
  description: string;
  settings: any;
}

export interface CreateLayer {
  createLayer: CreateLayer_createLayer;
}

export interface CreateLayerVariables {
  name: string;
  description: string;
  settings: any;
  mapId: string;
}
