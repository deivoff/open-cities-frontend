import React, { useMemo, useState } from 'react';
import css from './Popup.module.sass';
import { IconButton } from '$components/layout';

type LineProps = {
  name: string;
  value: React.ReactNode;
  hide?: boolean;
}
type Content = React.FC<{
  lines: LineProps[]
  onResize?: () => void;
}>
export const Content: Content = ({
  lines,
  onResize = () => {},
}) => {
  const [more, setMore] = useState(false);
  const sortedLines = useMemo(() => lines
    .sort((
      a, b,
      // eslint-disable-next-line no-nested-ternary
    ) => (a.hide === b.hide ? 0 : a ? -1 : 1)),
  [lines]);

  return (
    <>
      <ul className={css['popup__list']}>
        {sortedLines.map(line => {
          return (
            <Line
              key={line.name}
              value={line.value}
              name={line.name}
              hide={line.hide && !more}
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
      >
        {more ? 'Показать меньше' : 'Показать больше'}
      </IconButton>
    </>
  );
};

type Line = React.FC<LineProps>
const Line: Line = ({ value, name, hide }) => {
  if (hide) return null;

  return (
    <li key={name} className={css['popup__elem']}>
      <div className={css['popup__name']}>{name}</div>
      <div className={css['popup__value']}>{value}</div>
    </li>
  );
};
