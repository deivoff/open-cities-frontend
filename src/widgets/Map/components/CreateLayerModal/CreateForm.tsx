import React from 'react';
import { useFormik } from 'formik';
import { Button } from '$components/layout';
import CSVLoader from '../CSVLoader';
import { GeoInput, LayerSettings } from '$types/index';

export type Values = {
  name: string;
  description: string;
  settings: LayerSettings;
}

type Props = {
  handlerSubmit: (values: Values) => void;
  onGeosComplete: (geos: GeoInput[]) => void;
  layerId: string;
}

export const CreateForm: React.FC<Props> = ({ handlerSubmit, onGeosComplete, layerId }) => {
  const formik = useFormik<Values>({
    initialValues: {
      name: '',
      description: '',
      settings: {},
    },
    onSubmit: async values => handlerSubmit(values),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
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

      <CSVLoader
        onDotsNormalize={onGeosComplete}
        layerId={layerId}
      />

      <Button type="submit" style={{ display: 'block' }}>
        Отправить
      </Button>
    </form>
  );
};
