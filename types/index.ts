export * from './globalTypes';

export type LayerProperty = {
  key: string;
  name: string;
  type: string;
  description?: string;
  nested?: LayerProperty[];
}

export type Position = [number, number] | [number, number, number];
