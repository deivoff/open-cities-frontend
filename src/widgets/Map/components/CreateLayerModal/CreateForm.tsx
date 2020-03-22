import React from 'react';
import { useFormik } from 'formik';
import { Button } from '$components/layout';
import CSVLoader from '../CSVLoader';
import { LayerProperty } from '$types/index';

export type Values = {
  name: string;
  description: string;
  properties: LayerProperty[];
}

type Props = {
  handlerSubmit: (values: Values) => void;
}

export const CreateForm: React.FC<Props> = ({ handlerSubmit }) => {
  const formik = useFormik<Values>({
    initialValues: {
      name: '',
      description: '',
      properties: [],
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
        onDotsNormalize={(data => console.log(data))}
      />

      <Button type="submit" style={{ display: 'block' }}>
        Отправить
      </Button>
    </form>
  );
};
