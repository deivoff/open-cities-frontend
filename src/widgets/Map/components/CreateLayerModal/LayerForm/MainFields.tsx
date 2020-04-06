import React from 'react';
import { useFormikContext } from 'formik';
import CSVReader from 'react-csv-reader';
import { Values } from './utils';
import { Icon } from '$components/layout';

import s from './LayerForm.module.sass';


type MainFields = React.ComponentType<{
  onFileLoaded: (data: any[]) => void;
}>
export const MainFields: MainFields = ({ onFileLoaded }) => {
  const formik = useFormikContext<Values>();
  return (
    <>
      <label htmlFor="name" className={s['layer-form__label']}>Название</label>
      <input
        id="name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
        className={s['layer-form__input']}
      />

      <label htmlFor="description" className={s['layer-form__label']}>Описание</label>
      <textarea
        id="description"
        name="description"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.description}
        className={s['layer-form__textarea']}
      />

      <CSVReader
        cssInputClass={s['layer-form-loader__input']}
        cssClass={s['layer-form__loader']}
        label={(
          <div className={s['layer-form-loader__label']}>
            <Icon icon="Plus" theme="main-blue" className={s['layer-form-loader__icon']} />
            <div>Загрузить файл с данными</div>
            <div>Форматы JSON, CSV</div>
          </div>
        )}

        onFileLoaded={onFileLoaded}
        parserOptions={{
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          transformHeader: header => header.toLowerCase().replace(/\W/g, '_'),
        }}
      />
    </>
  );
};
