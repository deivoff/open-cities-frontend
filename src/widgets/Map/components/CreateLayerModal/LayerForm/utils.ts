import moment from 'moment';
import _ from 'lodash';
import { GeometryType, LayerSettings, LayerSettingType } from '$types/index';
import { isDate, isNumber } from '$utils/index';

export type Row = {
  [key in string]: string;
};
export type Values = {
  name: string;
  description: string;
  settings: LayerSettings;
}
export function getDataType(key: string, value: string): LayerSettingType {
  let type = LayerSettingType.string;

  if (key === 'longitude') {
    return LayerSettingType.longitude;
  }

  if (key === 'latitude') {
    return LayerSettingType.latitude;
  }

  if (isNumber(value)) {
    type = LayerSettingType.number;
  }

  if (isDate(value)) {
    type = LayerSettingType.datetime;
  }

  return type;
}

export function initSettings(row: Row): LayerSettings {
  return Object.keys(row).reduce<LayerSettings>((acc, key) => ({
    ...acc,
    [key]: {
      key,
      name: key,
      type: getDataType(key, row[key]),
    },
  }), {});
}

export function getValue(value: any, type: LayerSettingType) {
  if (type === LayerSettingType.datetime) {
    return moment(value);
  }

  if (type === LayerSettingType.number) {
    return Number(value);
  }

  return value;
}

export function getGeoSettings(settings: LayerSettings) {
  const mutatedSettings = _.cloneDeep(settings);
  const geometryLinks = Object.keys(settings).reduce<any>((acc, key) => {
    if (settings[key].type === LayerSettingType.latitude) {
      delete mutatedSettings[key];
      return {
        ...acc,
        coordinates: [acc.coordinates[0], key],
      };
    }

    if (settings[key].type === LayerSettingType.longitude) {
      delete mutatedSettings[key];
      return {
        ...acc,
        coordinates: [key, acc.coordinates[1]],
      };
    }

    if (settings[key].type === LayerSettingType.geotype) {
      delete mutatedSettings[key];
      return {
        ...acc,
        type: settings[key].key,
      };
    }

    return acc;
  }, {
    coordinates: ['', ''],
  });

  if (!geometryLinks.type) {
    geometryLinks.type = GeometryType.Point;
  }

  return (row: Row) => ({
    geometry: {
      type: geometryLinks.type === GeometryType.Point
        ? GeometryType.Point
        : row[geometryLinks.type] as GeometryType,
      coordinates: [
        Number(row[geometryLinks.coordinates[0]]),
        Number(row[geometryLinks.coordinates[1]]),
      ],
    },
    properties: {
      ...Object.keys(mutatedSettings).reduce((acc, key) => ({
        ...acc,
        [key]: getValue(row[key], mutatedSettings[key].type),
      }), {}),
    },
  });
}
