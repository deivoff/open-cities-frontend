export * from './globalTypes';

export type LayerSettings = {
  [key in LayerSetting['key']]: LayerSetting;
}
export type LayerSetting = {
  key: string;
  name: string;
  type: string;
  description?: string;
  nested?: LayerSettings;
}

export type Position = [number, number];
