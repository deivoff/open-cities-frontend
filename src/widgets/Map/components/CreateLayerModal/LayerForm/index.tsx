import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import { Maybe } from 'graphql/jsutils/Maybe';
import { Button } from '$components/layout';
import {
  GeoInput, LayerConfigurations,
} from '$types/index';
import {
  CREATE_GEOS, CreateGeos, CreateGeosVariables,
  CREATE_LAYER_FOR_MAP, CreateLayerForMap, CreateLayerForMapVariables,
} from '$apollo/mutations';
import {
  GET_GEOS, GetGeos, GetGeosVariables,
  GET_LAYERS, GetLayers, GetLayersVariables,
} from '$apollo/queries';
import { MainFields } from './MainFields';
import { ConfigurationsFields } from './ConfigurationsFields';
import { getGeoConfigurations, Row, Values } from 'src/widgets/Map/components/CreateLayerModal/LayerForm/utils';

import s from './LayerForm.module.sass';

type Props = {
  formClose: () => void;
  mapId: string;
}

const useCreateLayerMutation = (
  mapId: string,
) => useMutation<CreateLayerForMap, CreateLayerForMapVariables>(CREATE_LAYER_FOR_MAP, {
  update: (cache, { data }) => {
    const options = {
      query: GET_LAYERS,
      variables: {
        mapId,
      },
    };

    const returnedLayer = data!.createLayerForMap;
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
  const [
    completedConfigurations, setCompletedConfigurations,
  ] = useState<Maybe<LayerConfigurations>>(null);
  const [createLayer, { data }] = useCreateLayerMutation(mapId);
  const [createGeos] = useCreateGeosMutation(layerId);

  useEffect(() => {
    if (data) {
      setLayerId(data.createLayerForMap._id);
    }
  }, [data, setLayerId]);

  useEffect(() => {
    if (layerId && completedConfigurations && rows) {
      const getGeoProperties = getGeoConfigurations(completedConfigurations);
      const geos: GeoInput[] = rows.map((row: Row) => ({
        layer: layerId,
        ...getGeoProperties(row),
      }));

      createGeos({
        variables: {
          geos,
        },
      });
    }
  }, [createGeos, rows, layerId, completedConfigurations]);

  const handlerFileLoaded = (fileData: any[]) => {
    setRows(fileData);
  };

  const handlerSetSettings = (settings: LayerConfigurations) => {
    setCompletedConfigurations(settings);
  };

  return (
    <Formik<Values>
      initialValues={{
        name: '',
        description: '',
        configuration: {},
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
            <h2 className={s['layer-form__title']}>Добавление слоя</h2>
            <MainFields onFileLoaded={handlerFileLoaded} />
            {rows && (
              <ConfigurationsFields
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
