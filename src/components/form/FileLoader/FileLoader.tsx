import React, {
  Reducer, useReducer,
} from 'react';
import cn from 'classnames';
import CSVReader, { CSVReaderProps } from 'react-csv-reader';
import { Icon } from '$components/layout';

import s from './FileLoader.module.sass';
import { getLabelClassNames } from '$components/form';

const INITIAL_STATE = {
  title: 'Загрузить файл с данными',
  label: 'Форматы JSON, CSV',
  loaded: false,
};
type State = typeof INITIAL_STATE;
type Actions = {
  type: 'init'
} | {
  type: 'loaded';
  payload: {
    rows: number;
    filename: string;
  }
}
const reducer: Reducer<State, Actions> = (
  state,
  action,
) => {
  switch (action.type) {
  case 'loaded': {
    return {
      title: action.payload.filename,
      label: `Количество строк: ${action.payload.rows}`,
      loaded: true,
    };
  }
  default: {
    return state;
  }
  }
};

type FileLoader = React.FC<Pick<CSVReaderProps, 'onFileLoaded'> & {
  className?: string;
  showLabel?: boolean;
}>
export const FileLoader: FileLoader = ({
  className = '',
  onFileLoaded,
  showLabel,
}) => {
  const [{
    title,
    label,
    loaded,
  }, dispatch] = useReducer(reducer, INITIAL_STATE);

  const labelContent = loaded ? (
    <>
      <div>{title}</div>
      {/* <Icon */}
      {/*  icon="Plus" */}
      {/*  theme="blue" */}
      {/*  className={cn(s['fileloader__icon'], s['_loaded'])} */}
      {/* /> */}
    </>
  ) : (
    <>
      <Icon icon="Plus" theme="blue" className={s['fileloader__icon']} />
      <div>{title}</div>
    </>
  );

  return (
    <CSVReader
      cssClass={cn(s['fileloader'], className)}
      cssInputClass={s['fileloader__input']}
      onFileLoaded={(data, fileInfo) => {
        dispatch({
          type: 'loaded',
          payload: {
            rows: data.length,
            filename: fileInfo.name,
          },
        });
        onFileLoaded(data, fileInfo);
      }}
      label={(
        <div className={s['fileloader__control']}>
          <div className={s['fileloader__button']}>{labelContent}</div>
          {showLabel && (<div className={getLabelClassNames(s['fileloader__label'])}>{label}</div>)}
        </div>
      )}
      parserOptions={{
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: header => header.toLowerCase().replace(/\W/g, '_'),
      }}
    />
  );
};
