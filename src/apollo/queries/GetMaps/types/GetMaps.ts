/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserType } from "./../../../../../types/globalTypes";

// ====================================================
// GraphQL query operation: GetMaps
// ====================================================

export interface GetMaps_maps_access_view_group {
  __typename: "User";
  _id: string;
}

export interface GetMaps_maps_access_view {
  __typename: "AccessSettings";
  role: UserType | null;
  group: GetMaps_maps_access_view_group[] | null;
  anyone: boolean | null;
}

export interface GetMaps_maps_access_comment_group {
  __typename: "User";
  _id: string;
}

export interface GetMaps_maps_access_comment {
  __typename: "AccessSettings";
  role: UserType | null;
  group: GetMaps_maps_access_comment_group[] | null;
  anyone: boolean | null;
}

export interface GetMaps_maps_access_edit_group {
  __typename: "User";
  _id: string;
}

export interface GetMaps_maps_access_edit {
  __typename: "AccessSettings";
  role: UserType | null;
  group: GetMaps_maps_access_edit_group[] | null;
  anyone: boolean | null;
}

export interface GetMaps_maps_access {
  __typename: "Access";
  view: GetMaps_maps_access_view;
  comment: GetMaps_maps_access_comment;
  edit: GetMaps_maps_access_edit;
}

export interface GetMaps_maps {
  __typename: "Map";
  _id: string;
  name: string;
  description: string;
  access: GetMaps_maps_access;
}

export interface GetMaps {
  maps: GetMaps_maps[];
}

export interface GetMapsVariables {
  userId: string;
}
