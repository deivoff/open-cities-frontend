import { LatLng, Layer } from 'leaflet';

type Gradient = {
  [key in number]: string;
}
type Options = {
  minOpacity?: number;
  maxZoom?: number;
  max?: number;
  radius?: number
  blur?: number;
  gradient?: Gradient;
}
export class HeatLayer extends Layer {
  setOptions(options: Options): this;

  addLatLng(latlng: LatLng): this;

  setLatLngs(latlngs: LatLng[]): this;

  redraw(): this;
}

export function heatLayer(latlngs: LatLng[], options?: Options): HeatLayer;
