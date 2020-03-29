import React from 'react';
import { useFormik } from 'formik';
import { CreateGeo } from '$apollo/mutations';
import { Button } from '$components/layout';
import { GeometryType } from '$types/globalTypes';

type Props = {
  handlerSubmit: (values: Values) => void;
}
export type Values = {
  geometry: Pick<CreateGeo['createGeo']['geometry'], 'type' | 'coordinates'>,
  settings: {
    [key in string]: any;
  }
}
export const CreateForm: React.FC<Props> = (({ handlerSubmit }) => {
  const formik = useFormik<Values>({
    initialValues: {
      geometry: {
        type: GeometryType.Point,
        coordinates: [65.5152054, 57.1668968],
      },
      settings: {},
    },
    onSubmit: async values => handlerSubmit(values),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="geometry.type">Тип объекта</label>
      <select
        id="geometry.type"
        name="geometry.type"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.geometry.type}
      >
        {Object.values(GeometryType).map((value => (
          <option key={value} value={value}>{value}</option>
        )))}
      </select>

      <label htmlFor="properties.test">Описание слоя</label>
      <input
        id="properties.test"
        name="properties.test"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.settings.test}
      />
      <Button type="submit" style={{ display: 'block' }}>
        Отправить
      </Button>
    </form>
  );
});
