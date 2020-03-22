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

export interface GeometryInput {
  coordinates: any;
  type: GeometryType;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
