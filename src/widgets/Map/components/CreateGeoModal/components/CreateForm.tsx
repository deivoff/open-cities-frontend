import React from 'react';
import { useFormik } from 'formik';
import { CreateGeo_createGeo } from '$apollo/mutations';
import { Button } from '$components/layout';
import { GeometryType } from '$types/globalTypes';

type Props = {
  handlerSubmit: (values: Values) => void;
}
type Values = {
  geometry: Pick<CreateGeo_createGeo['geometry'], 'type' | 'coords'>,
  properties: {
    [key in string]: any;
  }
}
export const CreateForm: React.FC<Props> = (({ handlerSubmit }) => {
  const formik = useFormik<Values>({
    initialValues: {
      geometry: {
        type: GeometryType.Point,
        coords: [0, 0],
      },
      properties: {},
    },
    onSubmit: async ({
      geometry,
      properties,
    }) => handlerSubmit({ geometry, properties }),
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
        value={formik.values.properties.test}
      />
      <Button type="submit" style={{ display: 'block' }}>
        Отправить
      </Button>
    </form>
  );
});
