import React from 'react';
import useToggle from '$hooks/useToggle';
import { useQuery } from '@apollo/react-hooks';
import { useLeaflet } from 'react-leaflet';
import cn from 'classnames';
import { IconButton } from '$components/layout';
import { GET_LAYERS, GetLayers, GetLayersVariables } from '$apollo/queries';

import css from './index.module.sass';


const useGetLayersQuery = (city: string) =>
  useQuery<GetLayers, GetLayersVariables>(GET_LAYERS, { variables: { city } });

type LayersController = React.FC<{
  city: string;
}>
export const LayersController: LayersController = ({ city }) => {
  const { data: layersData, loading: layersLoading, error: layersError } = useGetLayersQuery(city);
  const [open, handlerOpen] = useToggle(true);

  if (layersError) return null;
  if (layersLoading || !layersData) return null;

  return (
      <div
        className={css['layers-controller']}
        aria-hidden={!open}
      >
        <IconButton
          className={css['layers-controller__button']}
          icon="arrow"
          aria-expanded={open}
          onClick={handlerOpen}
        />
        <h3>Слои</h3>
        <Layers layers={layersData?.layers} />
      </div>
  );
};

type Layers = React.FC<{ layers: GetLayers['layers'] }>
const Layers: Layers = ({ layers }) => {
  if (!layers.length) return <>У этой карты пока нет слоев :с</>;

  return (
    <ul className={css['layers-controller__list']}>
      <h3 className={css['layers-controller__title']}>Пользовательские слои</h3>
      {layers.map((layer) => (
        <Layer key={layer._id} layer={layer} />
      ))}
    </ul>
  )
};

type Layer = React.FC<{ layer: GetLayers['layers'][0] }>
const Layer: Layer = ({ layer: { name, description } }) => {
  const { map } = useLeaflet();
  const [open, handlerOpen] = useToggle(true);
  const [visible, handlerVisible] = useToggle(false);

  return (
    <li
      className={cn(
        css['layers-controller__elem'],
        css['layer-controller']
      )}
    >
      <div className={css['layer-controller__header']}>
        <IconButton
          icon="arrow"
          onClick={handlerOpen}
          aria-expanded={open}
        />
        {name}
        <IconButton
          icon="eye"
          onClick={handlerVisible}
          className={cn(
            css['layer-controller__eye'],
            visible && css['_visible']
          )}
        />
      </div>
      <div
        className={css['layer-controller__body']}
        aria-hidden={!open}
      >
        {description}
      </div>
    </li>
  )
};
