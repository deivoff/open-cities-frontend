import { gql } from 'apollo-boost';

export * from './types/CreateGeos';

export const CREATE_GEO = gql`
    mutation CreateGeos($geos: [GeoInputExtended!]!) {
        createGeos(geoInput: $geos)
    }
`;
