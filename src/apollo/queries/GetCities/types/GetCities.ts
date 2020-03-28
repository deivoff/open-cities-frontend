/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCities
// ====================================================

export interface GetCities_cities_map {
  __typename: "Map";
  _id: string;
}

export interface GetCities_cities {
  __typename: "City";
  name: string;
  url: string;
  map: GetCities_cities_map;
}

export interface GetCities {
  cities: GetCities_cities[];
}
