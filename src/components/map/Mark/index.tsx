import React from 'react';
import SvgMapMark from '$icons/MapMark';

type Mark = React.FC<{
  color: string;
}>
export const Mark: Mark = ({ color }) => (
  <div style={{ color }}>
    <SvgMapMark />
  </div>
);
