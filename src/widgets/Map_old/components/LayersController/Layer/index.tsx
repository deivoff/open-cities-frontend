import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { useLazyQuery } from '@apollo/react-hooks';
import { useLeaflet } from 'react-leaflet';
import { geoJSON, divIcon, marker } from 'leaflet';
import cn from 'classnames';
import { heatLayer } from '$lib/leaflet/heat';
import {
  GET_GEOS, GetGeos, GetGeosVariables,
} from '$apollo/queries';
import { useAuth } from '$context/auth';
import useToggle from '$hooks/useToggle';
import { Spiner } from '$components/spiner';
import { Icon, IconButton } from '$components/layout';
import { Toggle, Range } from '$components/form';
import { CreateGeoModal } from '../../CreateGeoModal';
import { LayerConfigurations, USER_ROLE } from '$types/index';

import css from './Layer.module.sass';
import { Mark, Popup } from '$components/map';
import { getValueToJSX } from '$widgets/Layer/ConfigurationConstructor/utils';

type Layer = React.FC<{
  layer: {
    _id: any;
    name: string;
    description?: string;
    color: string;
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
  return useLazyQuery<GetGeos, GetGeosVariables>(GET_GEOS, {
    variables: {
      layerId,
    },
  });
}

type LeafletLayer<T extends object> = {
  configuration: LayerConfigurations;
  color?: string;
  geos?: Geo[];
  visible: boolean;
} & T;

type UseLeafletLayerParams<T extends object = {}> = LeafletLayer<T>;

const useLeafletGeoJSONLayer = ({
  configuration,
  geos,
  visible,
  color,
}: UseLeafletLayerParams) => {
  const { map } = useLeaflet();
  const contentElement = document.createElement('div');

  const { current: geoGroup } = useRef(
    geoJSON(
      undefined,
      {
        pointToLayer: (feature, latLng) => {
          const icon = divIcon({
            className: 'null',
            html: ReactDOMServer.renderToString(<Mark color={color || '#000'} />),
          });

          return marker(latLng, { icon });
        },
        onEachFeature: (point, layer) => {
          layer
            .bindPopup(contentElement, {
              className: css['popup'],
            })
            .on('popupopen', () => {
              ReactDOM.render(
                <Popup.Content
                  lines={Object.keys(point.properties).map(key => ({
                    name: configuration[key].name,
                    value: getValueToJSX(point.properties[key], configuration[key].type),
                    hide: configuration[key].hide,
                  }))}
                  onResize={() => {
                    const popup = layer.getPopup();

                    if (popup) {
                      setTimeout(
                        () => popup.update(), 100,
                      );
                    }
                  }}
                />,
                contentElement,
              );
            });
        },
      },
    ),
  );

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

  return () => null;
};

const useLeafletHeatLayer = ({
  geos,
  visible,
}: UseLeafletLayerParams) => {
  const { map } = useLeaflet();
  const [radius, setRadius] = useState(25);

  const { current: heatGroup } = useRef(heatLayer([], {
    radius,
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

  return function HeatControl({ disabled }: { disabled: boolean }) {
    return (
      <Range
        value={radius}
        name="heat-range"
        disabled={disabled}
        min={0}
        max={100}
        onChange={(e: any) => {
          const newVal = e.target.value;
          setRadius(newVal);
          heatGroup.setOptions({
            radius: newVal,
          });
        }}
        onBlur={() => {}}
      >
        Радиус точек
      </Range>
    );
  };
};

const Layer: Layer = ({
  className, layer: {
    _id,
    name,
    description,
    configuration,
    color,
  },
}) => {
  const { user } = useAuth();

  const [open, handlerOpen] = useToggle(false);
  const [visible, handlerVisible] = useToggle(false);
  const [heat, toggleHeat] = useToggle(false);
  const [query, { data, error, loading }] = useGetGeos(_id);

  const FilterControl = useLeafletGeoJSONLayer({
    configuration,
    geos: data?.geos,
    color,
    visible: visible && !heat,
  });

  const HeatControl = useLeafletHeatLayer({
    configuration,
    geos: data?.geos,
    visible: visible && heat,
  });

  const isResearcher = user?.access === (USER_ROLE.ADMIN || USER_ROLE.RESEARCHER);
  let buttonVisible = (
    <IconButton
      icon={visible ? 'Eye' : 'EyeHidden'}
      onClick={() => {
        handlerVisible();
        query();
      }}
      theme={visible ? 'white' : 'disabled'}
      className={cn(css['layer-controller__eye'])}
    />
  );
  if (error) {
    buttonVisible = <>X</>;
  }
  if (loading) {
    buttonVisible = (<Spiner />);
  }

  return (
    <li
      className={cn(
        className,
        css['layer-controller'],
      )}
      style={{
        borderLeftColor: color,
      }}
    >
      <div
        className={cn(css['layer-controller__header'])}
      >
        {buttonVisible}
        {name}
        <IconButton
          icon="ArrowLeft"
          theme="white"
          onClick={handlerOpen}
          aria-expanded={open}
          className={cn(css['layer-controller__arrow'])}
        />
      </div>
      <div
        className={css['layer-controller__body']}
        aria-hidden={!open}
      >
        {description}
        <Toggle
          value={heat}
          name="heat"
          onChange={() => toggleHeat()}
          onBlur={() => {}}
        >Тепловая карта
        </Toggle>
        <HeatControl disabled={!heat} />
        <FilterControl />
        {isResearcher && <CreateGeoModal layerId={_id} configuration={configuration} />}
      </div>
    </li>
  );
};

export default Layer;
