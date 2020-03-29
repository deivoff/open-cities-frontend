import * as React from 'react';

const SvgArrowLeft = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={9} height={14} fill="none" {...props}>
    <path d="M8 1L2 7l6 6" stroke="currentColor" strokeWidth={1.5} />
  </svg>
);

export default SvgArrowLeft;
