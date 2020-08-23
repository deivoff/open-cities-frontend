import React from 'react';
import { Map } from '$components/map';
import { Position } from '$types/index';
import { LayerControl } from '$widgets/Map/Control';
import * as MapComponents from '$widgets/Map_old/components';

type Props = {
  bbox: Position[];
  mapId: string;
  layers: React.ComponentProps<MapComponents.LayersController>['layers']
}
export const CityMap: React.FC<Props> = ({ bbox, layers, mapId }) => (
  <Map bbox={bbox}>
    <LayerControl position="topleft">
      <MapComponents.LayersController layers={layers} mapId={mapId} />
    </LayerControl>
  </Map>
);
