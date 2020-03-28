/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { MapInput, AccessType, UserType } from "./../../../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateMap
// ====================================================

export interface CreateMap_createMap_settings {
  __typename: "MapSettings";
  bbox: any[];
  zoom: number;
}

export interface CreateMap_createMap_access_view_group {
  __typename: "User";
  _id: string;
}

export interface CreateMap_createMap_access_view {
  __typename: "AccessSettings";
  role: UserType | null;
  group: CreateMap_createMap_access_view_group[] | null;
  anyone: boolean | null;
}

export interface CreateMap_createMap_access_comment_group {
  __typename: "User";
  _id: string;
}

export interface CreateMap_createMap_access_comment {
  __typename: "AccessSettings";
  role: UserType | null;
  group: CreateMap_createMap_access_comment_group[] | null;
  anyone: boolean | null;
}

export interface CreateMap_createMap_access_edit_group {
  __typename: "User";
  _id: string;
}

export interface CreateMap_createMap_access_edit {
  __typename: "AccessSettings";
  role: UserType | null;
  group: CreateMap_createMap_access_edit_group[] | null;
  anyone: boolean | null;
}

export interface CreateMap_createMap_access {
  __typename: "Access";
  view: CreateMap_createMap_access_view;
  comment: CreateMap_createMap_access_comment;
  edit: CreateMap_createMap_access_edit;
}

export interface CreateMap_createMap {
  __typename: "Map";
  name: string;
  description: string;
  settings: CreateMap_createMap_settings;
  access: CreateMap_createMap_access;
}

export interface CreateMap {
  createMap: CreateMap_createMap;
}

export interface CreateMapVariables {
  mapSettings: MapInput;
  type?: AccessType | null;
}
