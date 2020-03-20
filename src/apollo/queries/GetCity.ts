import { gql } from 'apollo-boost';
export * from './types/GetCity';

export const GET_CITY = gql`
    query GetCity($url: String!) {
        getCity(url: $url) {
            name
            center
            zoom
        }
    }
`;
