/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { MapInput, AccessType, ACCESS_CODE } from "./../../../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateMap
// ====================================================

export interface CreateMap_createMap_settings {
  __typename: "MapSettings";
  bbox: any;
  zoom: number;
}

export interface CreateMap_createMap {
  __typename: "Map";
  name: string;
  description: string;
  settings: CreateMap_createMap_settings;
  access: ACCESS_CODE;
}

export interface CreateMap {
  createMap: CreateMap_createMap;
}

export interface CreateMapVariables {
  mapSettings: MapInput;
  type?: AccessType | null;
}
