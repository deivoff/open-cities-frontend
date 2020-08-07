/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCityMapId
// ====================================================

export interface GetCityMapId_city_map {
  __typename: "Map";
  _id: any;
  name: string;
}

export interface GetCityMapId_city {
  __typename: "City";
  map: GetCityMapId_city_map;
}

export interface GetCityMapId {
  city: GetCityMapId_city | null;
}

export interface GetCityMapIdVariables {
  url: string;
}
