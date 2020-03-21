import { gql } from 'apollo-boost';

export * from './types/GetGeos';

export const GET_GEOS = gql`
    query GetGeos($layerId: ID!)  {
        geos(layerId: $layerId) {
            _id
            geometry {
                type
                coords
            }
            properties
        }
    }
`;
