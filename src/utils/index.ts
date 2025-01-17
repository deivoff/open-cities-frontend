import { Map } from 'leaflet';
import moment from 'moment';
import { Position } from '$types/index';

export function getBoundsArray(target: Map): Position[] {
  const bbox = target.getBounds();
  const sw = bbox.getSouthWest();
  const ne = bbox.getNorthEast();
  return [[sw.lat, sw.lng], [ne.lat, ne.lng]];
}

export function getRandomInt(
  min: number,
  max: number,
) { return -(-(Math.random() * (max - min) + min)).toFixed(2); }

export function getRandomNormal(min: number, max: number, skew = 1): number {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  // if (num > 1 || num < 0) num = getRandomNormal(min, max, skew);
  // resample between 0 and 1 if out of range
  num **= skew; // Skew
  num *= max - min; // Stretch to fill range
  num += min; // offset to min
  return -(-num).toFixed(2);
}

export function isDate(date: any): boolean {
  return (moment(date).isValid());
}

export function isNumber(value: any): boolean {
  return !Number.isNaN(Number(value));
}
