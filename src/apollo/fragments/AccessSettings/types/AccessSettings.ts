/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserType } from "./../../../../../types/globalTypes";

// ====================================================
// GraphQL fragment: AccessSettings
// ====================================================

export interface AccessSettings_group {
  __typename: "User";
  _id: string;
}

export interface AccessSettings {
  __typename: "AccessSettings";
  role: UserType | null;
  group: AccessSettings_group[] | null;
  anyone: boolean | null;
}
