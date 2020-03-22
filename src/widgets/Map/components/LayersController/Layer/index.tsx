import React, { useEffect, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useLeaflet } from 'react-leaflet';
import { geoJSON } from 'leaflet';
import cn from 'classnames';
import {
  GET_GEOS, GetGeos, GetGeosVariables, GetLayers,
} from '$apollo/queries';
import { useAuth } from '$context/auth';
import useToggle from '$hooks/useToggle';
import { Spiner } from '$components/spiner';
import { IconButton } from '$components/layout';
import { CreateGeoModal } from '../../CreateGeoModal';

import css from './Layer.module.sass';


type Layer = React.FC<{
  layer: GetLayers['layers'][0];
  className?: string;
}>

function useGetGeos(layerId: string) {
  return useQuery<GetGeos, GetGeosVariables>(GET_GEOS, {
    variables: {
      layerId,
    },
  });
}

const getColor = () => '_green';
const Layer: Layer = ({ className, layer: { _id, name, description } }) => {
  const { map } = useLeaflet();
  const { user } = useAuth();
  const { current: geoGroup } = useRef(geoJSON());
  const [open, handlerOpen] = useToggle(true);
  const [visible, handlerVisible] = useToggle(false);
  const { data, error, loading } = useGetGeos(_id);
  const isResearcher = user?.access !== 'user';
  let buttonVisible = <Spiner />;

  if (error) {
    buttonVisible = <>X</>;
  }
  if (loading) {
    buttonVisible = (<Spiner />);
  }
  if (data) {
    buttonVisible = (
      <IconButton
        icon="eye"
        onClick={handlerVisible}
        theme={visible ? 'info' : 'disabled'}
        className={cn(css['layer-controller__eye'])}
      />
    );
  }

  useEffect(() => {
    if (data) {
      geoGroup.clearLayers();
      data.geos.forEach(geo => {
        geoGroup.addData({
          type: 'Feature',
          ...geo,
        });
      });
    }
  }, [geoGroup, data]);

  useEffect(() => {
    if (visible) {
      geoGroup.addTo(map!);
    } else {
      geoGroup.removeFrom(map!);
    }
  }, [visible, geoGroup, map]);

  return (
    <li
      className={cn(
        className,
        css['layer-controller'],
      )}
    >
      <div className={cn(css['layer-controller__header'], css[getColor()])}>
        <IconButton
          icon="arrow"
          onClick={handlerOpen}
          aria-expanded={open}
          className={cn(css['layer-controller__arrow'])}
        />
        {name}
        {buttonVisible}
      </div>
      <div
        className={css['layer-controller__body']}
        aria-hidden={!open}
      >
        {description}
        {isResearcher && <CreateGeoModal layerId={_id} />}
      </div>
    </li>
  );
};

export default Layer;
