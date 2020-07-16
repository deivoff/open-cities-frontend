import React, { useMemo, useState } from 'react';
import cn from 'classnames';
import css from './Popup.module.sass';
import { getValueToJSX } from '$widgets/Map/components/CreateLayerModal/LayerForm/utils';
import { IconButton } from '$components/layout';

type PopupContent = React.FC<{
  configuration: any;
  properties: any;
  onResize?: () => void;
}>
export const PopupContent: PopupContent = ({
  configuration,
  properties,
  onResize = () => {},
}) => {
  const [more, setMore] = useState(false);
  const sortedPropertiesKeys = useMemo(() => Object.keys(properties)
    .sort((
      a, b,
      // eslint-disable-next-line no-nested-ternary
    ) => (configuration[a].hide === configuration[b].hide ? 0 : a ? -1 : 1)),
  [properties, configuration]);

  return (
    <>
      <ul className={css['popup__list']}>
        {sortedPropertiesKeys.map(key => {
          const { name, hide } = configuration[key];
          const value = getValueToJSX(properties[key], configuration[key].type);

          return (
            <PopupElement
              key={name}
              value={value}
              name={name}
              hidden={hide && !more}
            />
          );
        })}
      </ul>
      <IconButton
        icon="ArrowTop"
        theme="transparent-blue"
        onClick={() => {
          setMore(!more);
          onResize();
        }}
        aria-expanded={more}
        className={cn(css['layer-controller__arrow'])}
      >
        {more ? 'Показать меньше' : 'Показать больше'}
      </IconButton>
    </>
  );
};

type PopupElement = React.FC<{
  value: React.ReactNode;
  name: string;
  hidden: boolean;
}>
const PopupElement: PopupElement = ({ value, name, hidden }) => {
  if (hidden) return null;

  return (
    <li key={name} className={css['popup__elem']}>
      <div className={css['popup__name']}>{name}</div>
      <div className={css['popup__value']}>{value}</div>
    </li>
  );
};
