import { gql } from 'apollo-boost';

export * from './types/CreateLayer';

export const CREATE_LAYER = gql`
  mutation CreateLayer($name: String!, $description: String!, $city: String!, $properties: [JSON!]!) {
    createLayer(layerInput: { name: $name, description: $description, city: $city properties: $properties}) {
        _id
        name
        description
        properties
    }
  }
`;
