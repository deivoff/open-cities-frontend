import React from 'react';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import { Theme } from '../utils';

import css from './Icon.module.sass';

export type Icon = React.FC<{
    icon: string;
    theme?: Theme;
    svg?: React.SVGProps<SVGSVGElement>;
    className?: string;
}>
export const Icon: Icon = ({
  icon,
  theme,
  svg,
  className,
}) => {
  const SVGIcon = dynamic(() => import(`$icons/${icon}`), { ssr: false });

  return (
    <div className={cn(
      className,
      css['icon'],
      css[`_${theme}`],
    )}
    >
      <SVGIcon {...svg} />
    </div>
  );
};
