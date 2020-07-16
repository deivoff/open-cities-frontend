import {
  Map as LeafletMap, TileLayer, ZoomControl,
} from 'react-leaflet';
import React from 'react';
import { latLngBounds } from 'leaflet';
import { Position } from '$types/index';
import * as MapComponents from './components';

interface MapProps {
  map: {
    name: string;
    description: string;
    settings: {
      bbox: Position[]
    },
    layers: React.ComponentProps<MapComponents.LayersController>['layers']
    _id: any;
  }
}

const Map: React.FC<MapProps> = ({
  map: {
    settings: {
      bbox,
    },
    layers,
    _id,
  },
}) => (
  <LeafletMap
    bounds={bbox}
    style={{
      height: 'calc(100vh - var(--header-height))',
    }}
    zoomControl={false}
  >
    <MapComponents.Control position="topleft">
      <MapComponents.LayersController layers={layers} mapId={_id} />
    </MapComponents.Control>
    <TileLayer
      url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
    <ZoomControl position="bottomright" />
  </LeafletMap>
);

export default Map;
