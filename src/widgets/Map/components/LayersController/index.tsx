import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import useToggle from '$hooks/useToggle';
import { IconButton } from '$components/index';
import { useAuth } from '$context/auth';
import { GET_LAYERS, GetLayers, GetLayersVariables } from '$apollo/queries';
import { UserType } from '$types/globalTypes';
import Layer from './Layer';
import CreateLayerModal from '../CreateLayerModal';

import css from './index.module.sass';


const useGetLayersQuery = (
  city: string,
) => useQuery<GetLayers, GetLayersVariables>(GET_LAYERS, { variables: { city } });

type LayersController = React.FC<{
  city: string;
}>
export const LayersController: LayersController = ({ city }) => {
  const { data: layersData, loading: layersLoading, error: layersError } = useGetLayersQuery(city);
  const { user } = useAuth();
  const [open, handlerOpen] = useToggle(true);

  if (layersError) return null;
  if (layersLoading || !layersData) return null;
  const isResearcher = user?.access !== UserType.user;

  return (
    <div
      className={css['layers-controller']}
      aria-hidden={!open}
    >
      <div className={css['layers-controller__header']}>
        <IconButton
          className={css['layers-controller__button']}
          icon="arrow"
          theme={open ? 'disabled' : 'success'}
          aria-expanded={open}
          onClick={handlerOpen}
        />
        <h3>Слои</h3>
        {isResearcher && <CreateLayerModal city={city} />}
      </div>
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
      {layers.map(layer => (
        <Layer className={css['layers-controller__elem']} key={layer._id} layer={layer} />
      ))}
    </ul>
  );
};
