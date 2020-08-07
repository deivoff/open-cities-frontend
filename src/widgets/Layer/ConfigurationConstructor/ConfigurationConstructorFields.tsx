import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { useFormikContext } from 'formik';
import { LayerConfigurations } from '$types/index';
import { getRandomInt } from '$utils/index';
import { initConfiguration, Row, ConfigurationValues } from './utils';

import s from './ConfigurationConstructor.module.sass';
import { ConfigurationConstructorField } from '$widgets/Layer/ConfigurationConstructor/ConfigurationConstructorField';

type ConfigurationConstructorFields = React.FC<{
  rows?: Row[] | null;
  className?: string;
  disabled?: boolean;
}>

const COLUMNS = [
  'Исходный ключ',
  'Тип данных',
  'Имя поля',
  'Значение в файле',
  'Описание',
];

export const ConfigurationConstructorFields: ConfigurationConstructorFields = ({
  rows,
  className = '',
  disabled,
}) => {
  const [configuration, setConfiguration] = useState<LayerConfigurations | null>(null);
  const [testRow, setTestRow] = useState<Row | null>(null);

  const formik = useFormikContext<ConfigurationValues>();
  console.log(formik.values);

  useEffect(() => {
    if (rows) {
      const randomIndex = Number(getRandomInt(0, rows.length).toFixed(0));

      const randomRow = rows[randomIndex];
      setTestRow(randomRow);

      const initialConfiguration = initConfiguration(randomRow);
      setConfiguration(initialConfiguration);

      formik.setValues({
        ...formik.values,
        configuration: initialConfiguration,
      });
    }
  }, []);

  return (
    <div className={cn(s['configuration-constructor'], className)}>
      {COLUMNS.map(title => (<div key={title} className={s['configuration-constructor__title']}>{title}</div>))}
      {configuration && testRow && Object.keys(configuration).map(key => (
        <ConfigurationConstructorField
          key={key}
          configuration={configuration[key]}
          mockValue={testRow[key]}
        />
      ))}
    </div>
  );
};
