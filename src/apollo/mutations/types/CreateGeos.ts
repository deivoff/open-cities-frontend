/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { GeoInputExtended, GeometryType } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateGeos
// ====================================================

export interface CreateGeos_createGeos_geometry {
  __typename: "Geometry";
  type: GeometryType;
  coordinates: any;
}

export interface CreateGeos_createGeos {
  __typename: "Geo";
  _id: string;
  geometry: CreateGeos_createGeos_geometry;
  properties: any;
}

export interface CreateGeos {
  createGeos: CreateGeos_createGeos[];
}

export interface CreateGeosVariables {
  geos: GeoInputExtended[];
}
