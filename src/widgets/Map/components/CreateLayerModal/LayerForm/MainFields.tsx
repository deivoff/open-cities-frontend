import React from 'react';
import { useFormikContext } from 'formik';
import CSVReader from 'react-csv-reader';
import { Values } from './utils';

type MainFields = React.ComponentType<{
  onFileLoaded: (data: any[]) => void;
}>
export const MainFields: MainFields = ({ onFileLoaded }) => {
  const formik = useFormikContext<Values>();
  return (
    <>
      <label htmlFor="name">Название слоя</label>
      <input
        id="name"
        name="name"
        placeholder="Ваше название"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
      />

      <label htmlFor="description">Описание слоя</label>
      <textarea
        id="description"
        name="description"
        placeholder="Ваше описание"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.description}
      />

      <CSVReader
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
