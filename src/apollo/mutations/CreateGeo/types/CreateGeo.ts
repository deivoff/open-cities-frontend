/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { GeometryInput, GeometryType } from "./../../../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateGeo
// ====================================================

export interface CreateGeo_createGeo_geometry {
  __typename: "Geometry";
  type: GeometryType;
  coordinates: any;
}

export interface CreateGeo_createGeo {
  __typename: "Geo";
  _id: any;
  geometry: CreateGeo_createGeo_geometry;
  properties: any;
}

export interface CreateGeo {
  createGeo: CreateGeo_createGeo;
}

export interface CreateGeoVariables {
  geometry: GeometryInput;
  properties: any;
  layer: any;
}
