import { Map } from 'leaflet';
import { Position } from '$types/index';

export function getBoundsArray(target: Map): Position[] {
  const bbox = target.getBounds();
  const sw = bbox.getSouthWest();
  const ne = bbox.getNorthEast();
  return [[sw.lat, sw.lng], [ne.lat, ne.lng]];
}
