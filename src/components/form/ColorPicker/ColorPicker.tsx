import React, { useCallback, useState } from 'react';
import cn from 'classnames';
import {
  SketchPicker, SketchPickerProps, Color, ColorResult,
} from 'react-color';
import { Label } from '$components/form';
import { Mark } from '$components/map';
import s from './ColorPicker.module.sass';

type ColorPicker = React.FC<Omit<SketchPickerProps, 'onChange' | 'color'> & {
  onChange: (color: string) => void;
  color?: string;
  label?: string;
  className?: string;
}>;

export const ColorPicker: ColorPicker = ({
  onChange,
  className,
  label,
  color: initialColor = '#0029FF',
  ...props
}) => {
  const [visible, setVisible] = useState(false);
  const [color, setColor] = useState(initialColor);

  const handlerClick = useCallback(() => {
    setVisible(!visible);
  }, [visible, setVisible]);

  const handlerClose = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const handlerChange = useCallback((colorResult: ColorResult) => {
    onChange(colorResult.hex);
    setColor(colorResult.hex);
  }, [setColor, onChange]);

  return (
    <div className={cn(s['color-picker'], className)}>
      {label && <Label className={s['color-picker__label']}>{label}</Label>}
      <button type="button" className={s['color-picker__control']} onClick={handlerClick}>
        <div
          className={s['color-picker__button']}
          style={{
            backgroundColor: color,
          }}
        />
        <div className={s['color-picker__icon']}>
          <Mark color={color} />
        </div>
      </button>
      {
        visible && (
          <div className={s['color-picker__popover']}>
            <div className={s['color-picker__cover']} onClick={handlerClose} />
            <SketchPicker onChange={handlerChange} color={color} {...props} />
          </div>
        )
      }
    </div>
  );
};
