/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCity
// ====================================================

export interface GetCity_getCity {
  __typename: "City";
  name: string;
  center: any;
  zoom: number;
}

export interface GetCity {
  getCity: GetCity_getCity | null;
}

export interface GetCityVariables {
  url: string;
}
