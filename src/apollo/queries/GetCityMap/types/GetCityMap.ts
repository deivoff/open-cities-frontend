/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserType } from "./../../../../../types/globalTypes";

// ====================================================
// GraphQL query operation: GetCityMap
// ====================================================

export interface GetCityMap_city_map_layers {
  __typename: "Layer";
  name: string;
  description: string;
  settings: any[];
}

export interface GetCityMap_city_map_access_view_group {
  __typename: "User";
  _id: string;
}

export interface GetCityMap_city_map_access_view {
  __typename: "AccessSettings";
  role: UserType | null;
  group: GetCityMap_city_map_access_view_group[] | null;
  anyone: boolean | null;
}

export interface GetCityMap_city_map_access_comment_group {
  __typename: "User";
  _id: string;
}

export interface GetCityMap_city_map_access_comment {
  __typename: "AccessSettings";
  role: UserType | null;
  group: GetCityMap_city_map_access_comment_group[] | null;
  anyone: boolean | null;
}

export interface GetCityMap_city_map_access_edit_group {
  __typename: "User";
  _id: string;
}

export interface GetCityMap_city_map_access_edit {
  __typename: "AccessSettings";
  role: UserType | null;
  group: GetCityMap_city_map_access_edit_group[] | null;
  anyone: boolean | null;
}

export interface GetCityMap_city_map_access {
  __typename: "Access";
  view: GetCityMap_city_map_access_view;
  comment: GetCityMap_city_map_access_comment;
  edit: GetCityMap_city_map_access_edit;
}

export interface GetCityMap_city_map {
  __typename: "Map";
  layers: GetCityMap_city_map_layers[];
  access: GetCityMap_city_map_access;
}

export interface GetCityMap_city {
  __typename: "City";
  map: GetCityMap_city_map;
}

export interface GetCityMap {
  city: GetCityMap_city | null;
}

export interface GetCityMapVariables {
  url: string;
}
