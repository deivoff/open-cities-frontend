import { Map as LeafletMap, TileLayer, ZoomControl } from 'react-leaflet';
import * as MapComponents from './components';
import React from 'react';

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
      style={{ height: 'calc(100vh - 80px)' }}
      zoomControl={false}
    >
      <MapComponents.LayersController city={city} />
      <TileLayer
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <ZoomControl position="bottomright" />
  </LeafletMap>);
};

export default Map;
