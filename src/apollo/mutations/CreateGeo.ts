import { gql } from 'apollo-boost';

export * from './types/CreateGeo';

export const CREATE_GEO = gql`
    mutation CreateGeo($geometry: GeometryInput!, $properties: JSON!, $layer: ID!) {
        createGeo(geoInput: {geometry: $geometry, properties: $properties, layer: $layer}) {
            _id
            geometry {
                type
                coords
            }
            properties
        }
    }
`;
