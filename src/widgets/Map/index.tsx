import { Map as LeafletMap, TileLayer, ZoomControl } from 'react-leaflet';
import * as MapComponents from './components';
import React from 'react';

import css from './Map.module.sass';

interface MapProps {
  city: string;
  center: [number, number];
  zoom: number;
}

const Map: React.FC<MapProps> = ({ center, zoom, city }) => {
  return (
    <LeafletMap
      center={center}
      zoom={zoom}
      style={{
        height: 'calc(100vh - var(--header-height))',
      }}
      zoomControl={false}
    >
      <MapComponents.Control position="topleft">
        <MapComponents.LayersController city={city} />
      </MapComponents.Control>
      <TileLayer
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <ZoomControl position="bottomright" />
  </LeafletMap>);
};

export default Map;
