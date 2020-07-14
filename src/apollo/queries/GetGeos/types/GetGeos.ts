/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { GeometryType } from "./../../../../../types/globalTypes";

// ====================================================
// GraphQL query operation: GetGeos
// ====================================================

export interface GetGeos_geos_geometry {
  __typename: "Geometry";
  type: GeometryType;
  coordinates: any;
}

export interface GetGeos_geos {
  __typename: "Geo";
  _id: any;
  geometry: GetGeos_geos_geometry;
  properties: any;
}

export interface GetGeos {
  geos: GetGeos_geos[];
}

export interface GetGeosVariables {
  layerId: any;
}
