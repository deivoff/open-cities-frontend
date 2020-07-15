export * from './globalTypes';

export type LayerConfigurations = {
  [key in LayerConfiguration['key']]: LayerConfiguration;
}
export type LayerConfiguration = {
  key: string;
  name: string;
  type: LayerConfigurationType;
  description?: string;
  nested?: LayerConfigurations;
}

export enum LayerConfigurationType {
  string = 'String',
  number = 'Number',
  link = 'Link',
  datetime = 'Date',
  array = 'Array',
  latitude = 'Latitude',
  longitude = 'Longitude',
  geotype = 'Geotype'
}

export type Position = [number, number];
