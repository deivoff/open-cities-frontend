import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_LAYERS, GetLayers, GetLayersVariables } from '$apollo/queries';

import css from './index.module.sass';
import { useLeaflet } from 'react-leaflet';
import { Layer as LeafletLayer } from 'leaflet';


const useGetLayersQuery = (city: string) =>
  useQuery<GetLayers, GetLayersVariables>(GET_LAYERS, { variables: { city } });

type LayersController = React.FC<{
  city: string;
}>
export const LayersController: LayersController = ({ city }) => {
  const { data: layersData, loading: layersLoading, error: layersError } = useGetLayersQuery(city);

  if (layersError) return null;
  if (layersLoading || !layersData) return null;

  return (
    <div className={css.layers}>
      <h3>Слои</h3>
      <Layers layers={layersData?.layers} />
    </div>
  );
};

type Layers = React.FC<{ layers: GetLayers['layers'] }>
const Layers: Layers = ({ layers }) => {
  if (!layers.length) return <>У этой карты пока нет слоев :с</>;

  return (
    <ul>
      {layers.map((layer) => (
        <Layer key={layer._id} layer={layer} />
      ))}
    </ul>
  )
};

type Layer = React.FC<{ layer: GetLayers['layers'][0] }>
const Layer: Layer = ({ layer: { name } }) => {
  const { map } = useLeaflet();

  return (
    <li>{name}</li>
  )
};
