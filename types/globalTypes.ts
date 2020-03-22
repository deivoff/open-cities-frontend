/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum GeometryType {
  LineString = "LineString",
  MultiLineString = "MultiLineString",
  MultiPoint = "MultiPoint",
  MultiPolygon = "MultiPolygon",
  Point = "Point",
  Polygon = "Polygon",
}

export enum UserType {
  admin = "admin",
  researcher = "researcher",
  user = "user",
}

export interface GeoInputExtended {
  access: UserType;
  author: string;
  geometry: GeometryInput;
  layer: string;
  properties: any;
}

export interface GeometryInput {
  coordinates: any;
  type: GeometryType;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
