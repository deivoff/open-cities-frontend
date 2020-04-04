import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import Maybe from 'graphql/tsutils/Maybe';
import { useMutation } from '@apollo/react-hooks';
import { Button } from '$components/layout';
import {
  GeoInput, LayerSettings,
} from '$types/index';
import {
  CREATE_GEOS, CreateGeos, CreateGeosVariables,
  CREATE_LAYER, CreateLayer, CreateLayerVariables,
} from '$apollo/mutations';
import {
  GET_GEOS, GetGeos, GetGeosVariables,
  GET_LAYERS, GetLayers, GetLayersVariables,
} from '$apollo/queries';
import { MainFields } from './MainFields';
import { SettingsFields } from './SettingsFields';
import { getGeoSettings, Row, Values } from './utils';

import s from './LayerForm.module.sass';

type Props = {
  formClose: () => void;
  mapId: string;
}

const useCreateLayerMutation = (
  mapId: string,
) => useMutation<CreateLayer, CreateLayerVariables>(CREATE_LAYER, {
  update: (cache, { data }) => {
    const options = {
      query: GET_LAYERS,
      variables: {
        mapId,
      },
    };

    const returnedLayer = data!.createLayer;
    const cashedLayers = cache.readQuery<GetLayers, GetLayersVariables>(options);
    cache.writeQuery<GetLayers, GetLayersVariables>({
      ...options,
      data: {
        layers: [...cashedLayers!.layers, returnedLayer],
      },
    });
  },
});

const useCreateGeosMutation = (
  layerId: string,
) => useMutation<CreateGeos, CreateGeosVariables>(CREATE_GEOS, {
  update: (cache, { data }) => {
    if (layerId) {
      const options = {
        query: GET_GEOS,
        variables: {
          layerId,
        },
      };

      const returnedGeos = data!.createGeos;
      const cachedGeos = cache.readQuery<GetGeos, GetGeosVariables>(options) || { geos: [] };

      cache.writeQuery<GetGeos, GetGeosVariables>({
        ...options,
        data: {
          geos: [...cachedGeos.geos, ...returnedGeos],
        },
      });
    }
  },
});

export const LayerForm: React.FC<Props> = ({ formClose, mapId }) => {
  const [rows, setRows] = useState<Maybe<Row[]>>(null);
  const [layerId, setLayerId] = useState('');
  const [completedSettings, setCompletedSettings] = useState<Maybe<LayerSettings>>(null);
  const [createLayer, { data }] = useCreateLayerMutation(mapId);
  const [createGeos] = useCreateGeosMutation(layerId);

  useEffect(() => {
    if (data) {
      setLayerId(data.createLayer._id);
    }
  }, [data, setLayerId]);

  useEffect(() => {
    if (layerId && completedSettings && rows) {
      const getSettings = getGeoSettings(completedSettings);
      const geos: GeoInput[] = rows.map(row => ({
        layer: layerId,
        ...getSettings(row),
      }));

      createGeos({
        variables: {
          geos,
        },
      });
    }
  }, [createGeos, rows, layerId, completedSettings]);

  const handlerFileLoaded = (fileData: any[]) => {
    setRows(fileData);
  };

  const handlerSetSettings = (settings: LayerSettings) => {
    setCompletedSettings(settings);
  };

  return (
    <Formik<Values>
      initialValues={{
        name: '',
        description: '',
        settings: {},
      }}
      onSubmit={async values => {
        await createLayer({
          variables: {
            ...values,
            mapId,
          },
        });
        formClose();
      }}
    >{
        props => (
          <form onSubmit={props.handleSubmit} className={s['layer-form']}>
            <h2  className={s['layer-form__title']}>Добавление слоя</h2>
            <MainFields onFileLoaded={handlerFileLoaded} />
            {rows && (
              <SettingsFields
                rows={rows}
                onSettingsComplete={handlerSetSettings}
              />
            )}
            <Button type="submit" theme="main-blue" className={s['layer-form__button']}>
              Загрузить слой
            </Button>
            <Button type="button" theme="transparent-blue" className={s['layer-form__button']} onClick={formClose}>
              Отменить
            </Button>
          </form>
        )
      }
    </Formik>
  );
};
