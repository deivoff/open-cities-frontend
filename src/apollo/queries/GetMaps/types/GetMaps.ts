/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ACCESS_CODE } from "./../../../../../types/globalTypes";

// ====================================================
// GraphQL query operation: GetMaps
// ====================================================

export interface GetMaps_maps {
  __typename: "Map";
  _id: string;
  name: string;
  description: string;
  access: ACCESS_CODE;
}

export interface GetMaps {
  maps: GetMaps_maps[];
}

export interface GetMapsVariables {
  userId: string;
}
