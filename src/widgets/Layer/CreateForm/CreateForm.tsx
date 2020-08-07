import React, { useCallback, useState } from 'react';
import cn from 'classnames';
import { withFormik } from 'formik';
import { LayerConfiguration } from '$types/index';
import {
  ColorPicker, FileLoader, Input, TextArea,
} from '$components/form';
import { Button, Card } from '$components/layout';
import { ConfigurationConstructorFields } from '$widgets/Layer';

import s from './CreateForm.module.sass';

type Values = {
  name: string;
  description: string;
  color: string;
  configuration: Record<string, LayerConfiguration>;
}

type Row = {
  [key in string]: string;
}
type Props = {
  className?: string;
  onSubmit: (values: Values) => void;
};
export const CreateForm = withFormik<Props, Values>({
  mapPropsToValues: () => ({
    name: '',
    description: '',
    color: '#0029FF',
    configuration: {},
  }),
  handleSubmit: async (values, { props: { onSubmit } }) => onSubmit(values),
})(({
  handleSubmit,
  handleBlur,
  handleChange,
  setFieldValue,
  values,
  className = '',
}) => {
  const [rows, setRows] = useState<Row[] | null>(null);
  const handlerFileLoaded = useCallback((data: any[]) => {
    setRows(data);
  }, [setRows]);

  return (
    <form onSubmit={handleSubmit} className={cn(s['layer-form'], className)}>
      <FileLoader className={s['layer-form__loader']} onFileLoaded={handlerFileLoaded} showLabel />
      {rows && (
        <>
          <Card.Title className={s['layer-form__title']}>Общие поля</Card.Title>
          <div className={s['layer-form__field-row']}>
            <Input
              name="name"
              label="Название слоя"
              className={s['layer-form__input']}
              value={values.name}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <ColorPicker
              color={values.color}
              onChange={color => setFieldValue('color', color)}
              label="Цвет отображения"
            />
          </div>
          <TextArea
            name="description"
            label="Описание слоя"
            className={s['layer-form__textarea']}
            value={values.description}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <Card.Title className={s['layer-form__title']}>Вывод данных</Card.Title>
          <div className={s['layer-form__text']}>
            В данном разделе вы можете сверить и переопределить значение данных, выводимых на карту.
          </div>
          <ConfigurationConstructorFields
            rows={rows}
            className={s['layer-form__constructor']}
          />
          <Button type="submit" theme="main-blue" className={s['layer-form__submit']}>
            Загрузить слой
          </Button>
        </>
      )}
    </form>
  );
});
