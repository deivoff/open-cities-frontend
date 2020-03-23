import { gql } from 'apollo-boost';

export * from './types/CreateGeos';

export const CREATE_GEOS = gql`
    mutation CreateGeos($geos: [GeoInputExtended!]!) {
        createGeos(geoInput: $geos) {
            _id
            geometry {
                type
                coordinates
            }
            properties
        }
    }
`;
