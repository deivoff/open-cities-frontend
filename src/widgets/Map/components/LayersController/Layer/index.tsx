import React, { useEffect, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useQuery } from '@apollo/react-hooks';
import { useLeaflet } from 'react-leaflet';
import { geoJSON } from 'leaflet';
import cn from 'classnames';
import { heatLayer } from '$lib/leaflet/heat';
import {
  GET_GEOS, GetGeos, GetGeosVariables,
} from '$apollo/queries';
import { useAuth } from '$context/auth';
import useToggle from '$hooks/useToggle';
import { Spiner } from '$components/spiner';
import { IconButton } from '$components/layout';
import { CreateGeoModal } from '../../CreateGeoModal';
import { LayerConfigurations, USER_ROLE } from '$types/index';

import css from './Layer.module.sass';
import { getValue } from '$widgets/Map/components/CreateLayerModal/LayerForm/utils';


type Layer = React.FC<{
  layer: {
    _id: any;
    name: string;
    description?: string;
    owner: {
      name: {
        givenName: string;
        familyName: string;
      }
    }
    configuration: LayerConfigurations;
  };
  className?: string;
}>

type Geo = GetGeos['geos'][0];

function useGetGeos(layerId: string) {
  return useQuery<GetGeos, GetGeosVariables>(GET_GEOS, {
    variables: {
      layerId,
    },
  });
}

const getColor = () => '_green';

type LeafletLayer<T extends object> = {
  configuration: LayerConfigurations;
  geos?: Geo[];
  visible: boolean;
} & T;

type UseLeafletLayer<T extends object = {}> = (layer: LeafletLayer<T>) => void

const useLeafletGeoJSONLayer: UseLeafletLayer = ({
  configuration,
  geos,
  visible,
}) => {
  const { map } = useLeaflet();

  const { current: geoGroup } = useRef(geoJSON(undefined, {
    onEachFeature: (point, layer) => {
      const popupContentNode = (
        <ul className={css['popup__list']}>
          {Object.keys(point.properties).map(key => {
            const { name } = configuration[key];
            const value = String(getValue(point.properties[key], configuration[key].type));

            return (
              <li key={name} className={css['popup__elem']}>
                <div className={css['popup__name']}>{name}</div>
                <div className={css['popup__value']}>{value}</div>
              </li>
            );
          })}
        </ul>
      );
      const popupContentHtml = ReactDOMServer.renderToString(popupContentNode);
      layer.bindPopup(popupContentHtml, {
        className: css['popup'],
      });
    },
  }));

  useEffect(() => {
    if (geos) {
      geoGroup.clearLayers();

      geos.forEach(geo => {
        geoGroup.addData({
          type: 'Feature',
          ...geo,
        });
      });
    }

    return () => { geoGroup.clearLayers(); };
  }, [geoGroup, geos]);

  useEffect(() => {
    if (visible) {
      geoGroup.addTo(map!);
    } else {
      geoGroup.removeFrom(map!);
    }
    return () => { geoGroup.removeFrom(map!); };
  }, [visible, geoGroup, map]);
};

const useLeafletHeatLayer: UseLeafletLayer = ({
  configuration,
  geos,
  visible,
}) => {
  const { map } = useLeaflet();

  const { current: heatGroup } = useRef(heatLayer([], {
    radius: 40,
    minOpacity: 0.5,
    maxZoom: 23,
    blur: 15,
    max: 1.0,
  }));

  useEffect(() => {
    if (geos) {
      heatGroup.remove();

      heatGroup.setLatLngs(geos.map(geo => [
        geo.geometry.coordinates[1],
        geo.geometry.coordinates[0],
      ] as any));
    }

    return () => { heatGroup.remove(); };
  }, [heatGroup, geos]);

  useEffect(() => {
    if (visible) {
      heatGroup.addTo(map!);
    } else {
      heatGroup.removeFrom(map!);
    }
    return () => { heatGroup.removeFrom(map!); };
  }, [visible, heatGroup, map]);
};

const Layer: Layer = ({
  className, layer: {
    _id,
    name,
    description,
    configuration,
  },
}) => {
  const { user } = useAuth();
  const [open, handlerOpen] = useToggle(false);
  const [visible, handlerVisible] = useToggle(false);
  const [heat, toggleHeat] = useToggle(false);
  const { data, error, loading } = useGetGeos(_id);

  useLeafletGeoJSONLayer({
    configuration,
    geos: data?.geos,
    visible: visible && !heat,
  });

  useLeafletHeatLayer({
    configuration,
    geos: data?.geos,
    visible: visible && heat,
  });

  const isResearcher = user?.access === (USER_ROLE.ADMIN || USER_ROLE.RESEARCHER);
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
        icon={visible ? 'Eye' : 'EyeHidden'}
        onClick={handlerVisible}
        theme={visible ? 'white' : 'disabled'}
        className={cn(css['layer-controller__eye'])}
      />
    );
  }

  return (
    <li
      className={cn(
        className,
        css['layer-controller'],
      )}
    >
      <div className={cn(css['layer-controller__header'], css[getColor()])}>
        <IconButton
          icon="ArrowLeft"
          theme="white"
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
        <label>
          <input
            type="checkbox"
            checked={heat}
            onChange={toggleHeat}
          />
          Отобразить как тепловую
        </label>
        {isResearcher && <CreateGeoModal layerId={_id} />}
      </div>
    </li>
  );
};

export default Layer;
