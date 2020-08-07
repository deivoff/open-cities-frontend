import React from 'react';
import useToggle from '$hooks/useToggle';
import { IconButton } from '$components/index';
import { useAuth } from '$context/auth';
import { USER_ROLE } from '$types/index';
import Layer from './Layer';
import CreateLayerModal from '../CreateLayerModal';

import css from './index.module.sass';

export type LayersController = React.FC<{
  layers: React.ComponentProps<Layer>['layer'][];
  mapId: string;
}>
export const LayersController: LayersController = ({ layers, mapId }) => {
  const { user } = useAuth();
  const [open, handlerOpen] = useToggle(true);

  const isResearcher = user?.access === (USER_ROLE.ADMIN || USER_ROLE.RESEARCHER);
  return (
    <div
      className={css['layers-controller']}
      aria-hidden={!open}
    >
      <div className={css['layers-controller__header']}>
        <IconButton
          className={css['layers-controller__button']}
          icon="ArrowLeft"
          theme="white"
          aria-expanded={open}
          onClick={handlerOpen}
        />
        <h3>Слои</h3>
      </div>
      <Layers layers={layers} />
      {isResearcher && <CreateLayerModal mapId={mapId} />}
    </div>
  );
};

type Layers = React.FC<{ layers: React.ComponentProps<Layer>['layer'][] }>
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
