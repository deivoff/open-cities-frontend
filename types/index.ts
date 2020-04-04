export * from './globalTypes';

export type LayerSettings = {
  [key in LayerSetting['key']]: LayerSetting;
}
export type LayerSetting = {
  key: string;
  name: string;
  type: LayerSettingType;
  description?: string;
  nested?: LayerSettings;
}

export enum LayerSettingType {
  string = 'String',
  number = 'Number',
  datetime = 'Date',
  array = 'Array',
  latitude = 'Latitude',
  longitude = 'Longitude',
  geotype = 'Geotype'
}

export type Position = [number, number];
