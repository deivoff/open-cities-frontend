import React, { useCallback, useEffect, useState } from 'react';
import { CreateForm } from '$widgets/Layer/CreateForm';
import { getGeoConfigurations, Row } from '$widgets/Layer';
import { useCreateLayerMutation, useCreateGeosMutation } from './hooks';
import { GeoInput, LayerConfigurations } from '$types/index';
import { CreateLayerVariables } from '$apollo/mutations';

type Props = {
  mapId?: string | null;
  className?: string;
}
const CreateFormContainer: React.FC<Props> = ({ mapId, className = '' }) => {
  const [data, setData] = useState<Row[] | null>(null);
  const [layerId, setLayerId] = useState('');
  const [configuration, setConfiguration] = useState<LayerConfigurations | null>(null);

  const [createLayer, { data: layerData }] = useCreateLayerMutation();
  const [createGeos] = useCreateGeosMutation(layerId);

  useEffect(() => {
    if (!layerData) return;

    setLayerId(layerData.createLayer._id);
  }, [layerData, setLayerId]);

  useEffect(() => {
    if (!layerId || !configuration || !data) return;

    const getGeoProperties = getGeoConfigurations(configuration);

    const geos: GeoInput[] = data.map(row => ({
      layer: layerId,
      ...getGeoProperties(row),
    }));

    createGeos({
      variables: {
        geos,
      },
    });
  }, [data, layerId, configuration, createGeos]);

  const handlerData = useCallback((newData: any[]) => {
    setData(newData);
  }, [setData]);

  const handlerSubmitCreateLayer = useCallback(async (
    values: CreateLayerVariables,
  ) => {
    await createLayer({
      variables: {
        ...values,
        mapId,
      },
    });
    setConfiguration(values.configuration);
  }, [createLayer, mapId, setConfiguration]);

  return (
    <CreateForm
      onSubmit={handlerSubmitCreateLayer}
      className={className}
      onDataLoaded={handlerData}
    />
  );
};

export default CreateFormContainer;
