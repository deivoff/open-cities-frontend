import React, { useMemo } from 'react';
import { useFormikContext } from 'formik';
import { LayerConfiguration } from '$types/index';
import { ConfigurationValues } from '$widgets/Layer';
import { Input, getLabelClassNames, Select } from '$components/form';
import { getGeoPropertiesTypeOptions } from './utils';

type ConfigurationConstructorField = React.FC<{
  configuration: LayerConfiguration;
  disabled?: boolean;
  mockValue?: string;
}>

export const ConfigurationConstructorField: ConfigurationConstructorField = ({
  configuration,
  disabled,
  mockValue,
}) => {
  const formik = useFormikContext<ConfigurationValues>();
  const options = useMemo(() => getGeoPropertiesTypeOptions(), []);
  const value = formik.values.configuration[`${configuration.key}`]?.type ?? configuration.type;
  return (
    <>
      <div className={getLabelClassNames()}>{configuration.key}</div>
      <Select
        name={`configuration['${configuration.key}'].type`}
        options={options}
        onChange={option => formik.setFieldValue(`configuration['${configuration.key}'].type`, (option as any).value)}
        value={{ label: value, value }}
      />
      <Input
        name={`configuration['${configuration.key}'].name`}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.configuration[`${configuration.key}`]?.name ?? configuration.name}
      />
      <div className={getLabelClassNames()}>{mockValue || '-'}</div>
      <Input
        name={`configuration['${configuration.key}'].description`}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.configuration[`${configuration.key}`]?.description ?? ''}
      />
    </>
  );
};
