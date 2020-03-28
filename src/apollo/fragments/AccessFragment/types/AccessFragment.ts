/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserType } from "./../../../../../types/globalTypes";

// ====================================================
// GraphQL fragment: AccessFragment
// ====================================================

export interface AccessFragment_view_group {
  __typename: "User";
  _id: string;
}

export interface AccessFragment_view {
  __typename: "AccessSettings";
  role: UserType | null;
  group: AccessFragment_view_group[] | null;
  anyone: boolean | null;
}

export interface AccessFragment_comment_group {
  __typename: "User";
  _id: string;
}

export interface AccessFragment_comment {
  __typename: "AccessSettings";
  role: UserType | null;
  group: AccessFragment_comment_group[] | null;
  anyone: boolean | null;
}

export interface AccessFragment_edit_group {
  __typename: "User";
  _id: string;
}

export interface AccessFragment_edit {
  __typename: "AccessSettings";
  role: UserType | null;
  group: AccessFragment_edit_group[] | null;
  anyone: boolean | null;
}

export interface AccessFragment {
  __typename: "Access";
  view: AccessFragment_view;
  comment: AccessFragment_comment;
  edit: AccessFragment_edit;
}
