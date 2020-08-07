import moment from 'moment';
import React from 'react';
import _ from 'lodash';
import { GeometryType, LayerConfigurations, LayerConfigurationType } from '$types/index';
import { isDate, isNumber } from '$utils/index';
import { FormikValues } from 'formik';

export type Row = {
  [key in string]: string;
};

export type ConfigurationValues = FormikValues & {
  configuration: LayerConfigurations;
}

export type TypeOption = {
  label: string,
  value: LayerConfigurationType
}
export function getGeoPropertiesTypeOptions(): TypeOption[] {
  return Object.values(LayerConfigurationType).map(type => ({
    label: type as string,
    value: type,
  }));
}

export function getDataType(key: string, value: string): LayerConfigurationType {
  let type = LayerConfigurationType.string;

  if (key === 'longitude') {
    return LayerConfigurationType.longitude;
  }

  if (key === 'latitude') {
    return LayerConfigurationType.latitude;
  }

  if (isNumber(value)) {
    type = LayerConfigurationType.number;
  }

  if (isDate(value)) {
    type = LayerConfigurationType.datetime;
  }

  return type;
}

export function initConfiguration(row: Row): LayerConfigurations {
  return Object.keys(row).reduce<LayerConfigurations>((acc, key) => ({
    ...acc,
    [key]: {
      key,
      name: key,
      type: getDataType(key, row[key]),
    },
  }), {});
}

export function getValueToServer(value: any, type: LayerConfigurationType) {
  if (type === LayerConfigurationType.datetime) {
    const val = moment(value).toISOString();
    return val;
  }

  if (type === LayerConfigurationType.number) {
    return Number(value);
  }

  return value;
}

export function getValueToJSX(value: any, type: LayerConfigurationType) {
  if (!value) {
    return '-';
  }

  if (type === LayerConfigurationType.datetime) {
    return moment(value).format('DD.MM.YYYY HH:MM');
  }

  if (type === LayerConfigurationType.link) {
    return (<a href={value} target="_blank" rel="noreferrer">Перейти по ссылке</a>);
  }

  if (type === LayerConfigurationType.number) {
    return Number(value);
  }

  return value;
}

export function getGeoConfigurations(configurations: LayerConfigurations) {
  const mutatedConfigurations = _.cloneDeep(configurations);
  const geometryLinks = Object.keys(configurations).reduce<any>((acc, key) => {
    if (configurations[key].type === LayerConfigurationType.latitude) {
      delete mutatedConfigurations[key];
      return {
        ...acc,
        coordinates: [acc.coordinates[0], key],
      };
    }

    if (configurations[key].type === LayerConfigurationType.longitude) {
      delete mutatedConfigurations[key];
      return {
        ...acc,
        coordinates: [key, acc.coordinates[1]],
      };
    }

    if (configurations[key].type === LayerConfigurationType.geotype) {
      delete mutatedConfigurations[key];
      return {
        ...acc,
        type: configurations[key].key,
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
      ...Object.keys(mutatedConfigurations).reduce((acc, key) => ({
        ...acc,
        [key]: getValueToServer(row[key], mutatedConfigurations[key].type),
      }), {}),
    },
  });
}
