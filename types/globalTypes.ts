/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ACCESS_CODE {
  COMMENT = "COMMENT",
  COOWNER = "COOWNER",
  EDIT = "EDIT",
  NONE = "NONE",
  VIEW = "VIEW",
}

export enum AccessType {
  city = "city",
  default = "default",
}

export enum GeometryType {
  LineString = "LineString",
  MultiLineString = "MultiLineString",
  MultiPoint = "MultiPoint",
  MultiPolygon = "MultiPolygon",
  Point = "Point",
  Polygon = "Polygon",
}

export enum USER_ROLE {
  ADMIN = "ADMIN",
  RESEARCHER = "RESEARCHER",
  USER = "USER",
}

export interface GeoInput {
  geometry: GeometryInput;
  layer: string;
  properties: any;
}

export interface GeometryInput {
  coordinates: any;
  type: GeometryType;
}

export interface MapInput {
  description: string;
  name: string;
  settings: MapSettingInput;
}

export interface MapSettingInput {
  bbox: any;
  zoom: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
