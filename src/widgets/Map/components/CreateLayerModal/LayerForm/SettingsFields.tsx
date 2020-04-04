import React, { useEffect, useState } from 'react';
import Maybe from 'graphql/tsutils/Maybe';
import { useFormikContext } from 'formik';
import { LayerSetting, LayerSettings, LayerSettingType } from '$types/index';
import { getRandomInt } from '$utils/index';
import { Values, Row, initSettings } from './utils';

import s from './SettingsFields.module.sass';

type SettingsFields = React.FC<{
  rows: Row[]
  onSettingsComplete: (settings: LayerSettings) => void;
}>
export const SettingsFields: SettingsFields = ({ rows, onSettingsComplete }) => {
  const [settings, setSettings] = useState<Maybe<LayerSettings>>(null);
  const [disabled, setDisabled] = useState(false);
  const [row, setRow] = useState<Maybe<Row>>(null);
  const formik = useFormikContext<Values>();

  useEffect(() => {
    const random = Number(getRandomInt(0, rows.length).toFixed(0));
    const randomRow = rows[random];
    setRow(randomRow);
    const initial = initSettings(randomRow);
    setSettings(initial);
    formik.setValues({
      ...formik.values,
      settings: initial,
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
    onSettingsComplete(formik.values.settings);
  };

  return (
    <>
      {settings && row && Object.keys(settings).map(key => (
        <SettingField key={key} setting={settings[key]} value={row[key]} disabled={disabled} />
      ))}
      <button type="button" onClick={handleRandomRow} disabled={disabled}>Новую строку</button>
      <button type="button" onClick={handlerSettingsDone} disabled={disabled}>Завершить настройки</button>
    </>
  );
};

type SettingField = React.FC<{
  setting: LayerSetting
  disabled?: boolean;
  value: string,
}>
const SettingField: SettingField = ({ setting, value, disabled }) => {
  const formik = useFormikContext<Values>();
  return (
    <div className={s['setting-fields']}>
      <label htmlFor={`settings['${setting.key}'].type`}>{setting.key}</label>
      <select
        id={`settings['${setting.key}'].type`}
        name={`settings['${setting.key}'].type`}
        disabled={disabled}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.settings[`${setting.key}`]?.type ?? setting.type}
      >
        {Object.values(LayerSettingType).map((type => (
          <option key={type} value={type}>{type}</option>
        )))}
      </select>

      <label htmlFor={`settings['${setting.key}'].name`}>Имя поля</label>
      <input
        id={`settings['${setting.key}'].name`}
        name={`settings['${setting.key}'].name`}
        disabled={disabled}
        placeholder="Ваше название"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.settings[`${setting.key}`]?.name ?? setting.name}
      />
      {value}
    </div>
  );
};
