import { Map as LeafletMap, TileLayer, ZoomControl } from 'react-leaflet';
import React from 'react';
import { Position } from '$types/index';

type Map = React.FC<{
  bbox: Position[]
}>
export const Map: Map = ({
  bbox,
  children,
}) => (
  <LeafletMap
    bounds={bbox}
    style={{
      height: 'calc(100vh - var(--header-height))',
    }}
    zoomControl={false}
  >
    {children}
    <TileLayer
      url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
    <ZoomControl position="bottomright" />
  </LeafletMap>
);
