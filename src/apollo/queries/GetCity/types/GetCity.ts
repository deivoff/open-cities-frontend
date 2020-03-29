/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCity
// ====================================================

export interface GetCity_city_map_settings {
  __typename: "MapSettings";
  bbox: any[];
  zoom: number;
}

export interface GetCity_city_map_layers_owner_name {
  __typename: "UserName";
  givenName: string;
  familyName: string;
}

export interface GetCity_city_map_layers_owner {
  __typename: "User";
  _id: string;
  name: GetCity_city_map_layers_owner_name;
}

export interface GetCity_city_map_layers {
  __typename: "Layer";
  _id: string;
  name: string;
  description: string;
  owner: GetCity_city_map_layers_owner;
  settings: any[];
}

export interface GetCity_city_map {
  __typename: "Map";
  _id: string;
  name: string;
  description: string;
  settings: GetCity_city_map_settings;
  layers: GetCity_city_map_layers[];
}

export interface GetCity_city {
  __typename: "City";
  name: string;
  url: string;
  map: GetCity_city_map;
}

export interface GetCity {
  city: GetCity_city | null;
}

export interface GetCityVariables {
  url: string;
}
