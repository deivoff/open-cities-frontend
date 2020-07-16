import React, { useEffect, useState } from 'react';
import { useFormikContext } from 'formik';
import s from 'src/widgets/Map/components/CreateLayerModal/LayerForm/ConfigurationsFields.module.sass';
import { LayerConfiguration, LayerConfigurations, LayerConfigurationType } from '$types/index';
import { getRandomInt } from '$utils/index';
import { Values, Row, initSettings } from './utils';


type SettingsFields = React.FC<{
  rows: Row[]
  onSettingsComplete: (configurations: LayerConfigurations) => void;
}>
export const ConfigurationsFields: SettingsFields = ({ rows, onSettingsComplete }) => {
  const [configurations, setSettings] = useState<LayerConfigurations | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [row, setRow] = useState<Row | null>(null);
  const formik = useFormikContext<Values>();

  useEffect(() => {
    const random = Number(getRandomInt(0, rows.length).toFixed(0));
    const randomRow = rows[random];
    setRow(randomRow);
    const initial = initSettings(randomRow);
    setSettings(initial);
    formik.setValues({
      ...formik.values,
      configuration: initial,
    });
  }, []);

  const handleRandomRow = () => {
    const random = Number(getRandomInt(0, rows.length).toFixed(0));
    setRow(rows[random]);
    const initial = initSettings(rows[random]);
    setSettings(initial);
  };

  const handlerSettingsDone = () => {
    setDisabled(true);
    onSettingsComplete(formik.values.configuration);
  };

  return (
    <>
      {configurations && row && Object.keys(configurations).map(key => (
        <ConfigurationField
          key={key}
          configuration={configurations[key]}
          value={row[key]}
          disabled={disabled}
        />
      ))}
      <button type="button" onClick={handleRandomRow} disabled={disabled}>Новую строку</button>
      <button type="button" onClick={handlerSettingsDone} disabled={disabled}>Завершить настройки</button>
    </>
  );
};

type SettingField = React.FC<{
  configuration: LayerConfiguration
  disabled?: boolean;
  value: string,
}>
const ConfigurationField: SettingField = ({ configuration, value, disabled }) => {
  const formik = useFormikContext<Values>();
  return (
    <div className={s['configuration-fields']}>
      <label htmlFor={`configuration['${configuration.key}'].type`}>{configuration.key}</label>
      <select
        id={`configuration['${configuration.key}'].type`}
        name={`configuration['${configuration.key}'].type`}
        disabled={disabled}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.configuration[`${configuration.key}`]?.type ?? configuration.type}
      >
        {Object.values(LayerConfigurationType).map((type => (
          <option key={type} value={type}>{type}</option>
        )))}
      </select>

      <label htmlFor={`configuration['${configuration.key}'].name`}>Имя поля</label>
      <input
        id={`configuration['${configuration.key}'].name`}
        name={`configuration['${configuration.key}'].name`}
        disabled={disabled}
        placeholder="Ваше название"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.configuration[`${configuration.key}`]?.name ?? configuration.name}
      />
      {value}
    </div>
  );
};
