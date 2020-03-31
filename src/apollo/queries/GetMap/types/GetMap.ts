/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserType } from "./../../../../../types/globalTypes";

// ====================================================
// GraphQL query operation: GetMap
// ====================================================

export interface GetMap_map_layers {
  __typename: "Layer";
  name: string;
  description: string;
  settings: any;
}

export interface GetMap_map_access_view_group {
  __typename: "User";
  _id: string;
}

export interface GetMap_map_access_view {
  __typename: "AccessSettings";
  role: UserType | null;
  group: GetMap_map_access_view_group[] | null;
  anyone: boolean | null;
}

export interface GetMap_map_access_comment_group {
  __typename: "User";
  _id: string;
}

export interface GetMap_map_access_comment {
  __typename: "AccessSettings";
  role: UserType | null;
  group: GetMap_map_access_comment_group[] | null;
  anyone: boolean | null;
}

export interface GetMap_map_access_edit_group {
  __typename: "User";
  _id: string;
}

export interface GetMap_map_access_edit {
  __typename: "AccessSettings";
  role: UserType | null;
  group: GetMap_map_access_edit_group[] | null;
  anyone: boolean | null;
}

export interface GetMap_map_access {
  __typename: "Access";
  view: GetMap_map_access_view;
  comment: GetMap_map_access_comment;
  edit: GetMap_map_access_edit;
}

export interface GetMap_map {
  __typename: "Map";
  layers: GetMap_map_layers[];
  access: GetMap_map_access;
}

export interface GetMap {
  map: GetMap_map | null;
}

export interface GetMapVariables {
  id: string;
}
